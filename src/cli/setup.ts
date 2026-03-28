import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { detectConfigPaths } from "./config-paths";
import {
    buildModelSelection,
    getAvailableModels,
    getOpenCodeVersion,
    isOpenCodeInstalled,
} from "./opencode-helpers";
import { closePrompts, confirm, selectOne } from "./prompts";

const PLUGIN_NAME = "@cortexkit/opencode-magic-context";

// ─── Helpers ──────────────────────────────────────────────

function printStep(step: number, total: number, message: string): void {
    console.log(`  [${step}/${total}] ${message}`);
}

function printSuccess(message: string): void {
    console.log(`  ✓ ${message}`);
}

function printWarning(message: string): void {
    console.log(`  ⚠ ${message}`);
}

function printInfo(message: string): void {
    console.log(`  → ${message}`);
}

function ensureDir(dir: string): void {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}

/** Strip JS-style comments from JSONC to parse as JSON */
function stripJsoncComments(text: string): string {
    return text.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
}

function readJsonc(path: string): Record<string, unknown> {
    const content = readFileSync(path, "utf-8");
    try {
        return JSON.parse(stripJsoncComments(content));
    } catch {
        return {};
    }
}

function writeJsonc(path: string, data: Record<string, unknown>): void {
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

// ─── Config Manipulators ──────────────────────────────────

function addPluginToOpenCodeConfig(configPath: string, format: "json" | "jsonc" | "none"): void {
    ensureDir(dirname(configPath));

    if (format === "none") {
        const config = {
            plugin: [PLUGIN_NAME],
            compaction: { auto: false, prune: false },
        };
        writeJsonc(configPath, config);
        return;
    }

    const config = readJsonc(configPath);

    // Add plugin if not present
    const plugins = (config.plugin as string[]) ?? [];
    const hasPlugin = plugins.some((p) => p === PLUGIN_NAME || p.startsWith(`${PLUGIN_NAME}@`));
    if (!hasPlugin) {
        plugins.push(PLUGIN_NAME);
        config.plugin = plugins;
    }

    // Disable compaction
    const compaction = (config.compaction as Record<string, unknown>) ?? {};
    compaction.auto = false;
    compaction.prune = false;
    config.compaction = compaction;

    writeJsonc(configPath, config);
}

function writeMagicContextConfig(
    configPath: string,
    options: {
        historianModel: string | null;
        dreamerEnabled: boolean;
        dreamerModel: string | null;
        sidekickEnabled: boolean;
        sidekickModel: string | null;
    },
): void {
    const config: Record<string, unknown> = {};

    if (options.historianModel) {
        config.historian = { model: options.historianModel };
    }

    if (options.dreamerEnabled) {
        const dreamer: Record<string, unknown> = { enabled: true };
        if (options.dreamerModel) {
            dreamer.model = options.dreamerModel;
        }
        config.dreamer = dreamer;
    } else {
        config.dreamer = { enabled: false };
    }

    if (options.sidekickEnabled) {
        const sidekick: Record<string, unknown> = { enabled: true };
        if (options.sidekickModel) {
            sidekick.model = options.sidekickModel;
        }
        config.sidekick = sidekick;
    }

    writeJsonc(configPath, config);
}

function disableOmoHooks(omoConfigPath: string): void {
    const config = readJsonc(omoConfigPath);
    const disabledHooks = (config.disabled_hooks as string[]) ?? [];

    const hooksToDisable = [
        "context-window-monitor",
        "preemptive-compaction",
        "anthropic-context-window-limit-recovery",
    ];

    for (const hook of hooksToDisable) {
        if (!disabledHooks.includes(hook)) {
            disabledHooks.push(hook);
        }
    }

    config.disabled_hooks = disabledHooks;
    writeJsonc(omoConfigPath, config);
}

// ─── Main Setup Flow ──────────────────────────────────────

export async function runSetup(): Promise<number> {
    console.log("");
    console.log("  ✨ Magic Context — Setup Wizard");
    console.log("  ═══════════════════════════════");
    console.log("");

    const totalSteps = 8;
    let step = 1;

    // ─── Step 1: Check OpenCode ─────────────────────────
    printStep(step++, totalSteps, "Checking OpenCode installation...");

    const installed = isOpenCodeInstalled();
    if (!installed) {
        printWarning("OpenCode not found on PATH.");
        const shouldContinue = await confirm("Continue setup anyway?", false);
        if (!shouldContinue) {
            console.log("");
            printInfo("Install OpenCode: https://opencode.ai");
            console.log("");
            closePrompts();
            return 1;
        }
    } else {
        const version = getOpenCodeVersion();
        printSuccess(`OpenCode ${version ?? ""} detected`);
    }
    console.log("");

    // ─── Step 2: Get available models ───────────────────
    printStep(step++, totalSteps, "Fetching available models...");

    const allModels = installed ? getAvailableModels() : [];
    if (allModels.length > 0) {
        printSuccess(`Found ${allModels.length} models`);
    } else {
        printWarning("No models found (OpenCode not installed or no providers configured)");
        printInfo("You can configure models manually in magic-context.jsonc later");
    }
    console.log("");

    // ─── Step 3: Detect config paths ────────────────────
    const paths = detectConfigPaths();

    // ─── Step 4: Add plugin & disable compaction ────────
    printStep(step++, totalSteps, "Configuring OpenCode...");

    addPluginToOpenCodeConfig(paths.opencodeConfig, paths.opencodeConfigFormat);
    printSuccess(`Plugin added to ${paths.opencodeConfig}`);
    printInfo("Disabled built-in compaction (auto=false, prune=false)");
    printInfo("Magic Context handles context management — built-in compaction would interfere");
    console.log("");

    // ─── Step 5: Historian model ────────────────────────
    printStep(step++, totalSteps, "Configure historian (background context compressor)...");
    console.log("");

    let historianModel: string | null = null;
    if (allModels.length > 0) {
        const historianOptions = buildModelSelection(allModels, "historian");
        if (historianOptions.length > 0) {
            historianModel = await selectOne(
                "Select a model for historian (compresses conversation history):",
                historianOptions,
            );
            printSuccess(`Historian model: ${historianModel}`);
        } else {
            printInfo("No suitable historian models found. Using built-in fallback chain.");
        }
    } else {
        printInfo("Skipping model selection (no models available). Using built-in fallback chain.");
    }
    console.log("");

    // ─── Step 6: Dreamer ────────────────────────────────
    printStep(step++, totalSteps, "Configure dreamer (overnight memory maintenance)...");
    console.log("");

    printInfo("The dreamer runs overnight to consolidate, verify, and maintain project memories.");
    const dreamerEnabled = await confirm("Enable dreamer?", true);
    let dreamerModel: string | null = null;

    if (dreamerEnabled && allModels.length > 0) {
        const dreamerOptions = buildModelSelection(allModels, "dreamer");
        if (dreamerOptions.length > 0) {
            dreamerModel = await selectOne(
                "Select a model for dreamer (runs in background, local LLMs ideal):",
                dreamerOptions,
            );
            printSuccess(`Dreamer model: ${dreamerModel}`);
        } else {
            printInfo("No suitable dreamer models found. Using built-in fallback chain.");
        }
    } else if (dreamerEnabled) {
        printInfo("Using built-in fallback chain for dreamer.");
    }
    console.log("");

    // ─── Step 7: Sidekick ───────────────────────────────
    printStep(step++, totalSteps, "Configure sidekick (on-demand prompt augmentation)...");
    console.log("");

    printInfo("Sidekick augments prompts with project context via /ctx-aug command.");
    const sidekickEnabled = await confirm("Enable sidekick?", false);
    let sidekickModel: string | null = null;

    if (sidekickEnabled && allModels.length > 0) {
        const sidekickOptions = buildModelSelection(allModels, "sidekick");
        if (sidekickOptions.length > 0) {
            sidekickModel = await selectOne(
                "Select a model for sidekick (fast models preferred):",
                sidekickOptions,
            );
            printSuccess(`Sidekick model: ${sidekickModel}`);
        } else {
            printInfo("No suitable sidekick models found. Using built-in fallback chain.");
        }
    } else if (sidekickEnabled) {
        printInfo("Using built-in fallback chain for sidekick.");
    }
    console.log("");

    // Write magic-context config
    writeMagicContextConfig(paths.magicContextConfig, {
        historianModel,
        dreamerEnabled,
        dreamerModel,
        sidekickEnabled,
        sidekickModel,
    });
    printSuccess(`Config written to ${paths.magicContextConfig}`);
    console.log("");

    // ─── Step 8: Oh-My-OpenCode compatibility ───────────
    printStep(step++, totalSteps, "Checking for oh-my-opencode...");

    if (paths.omoConfig) {
        printWarning(`Found oh-my-opencode config: ${paths.omoConfig}`);
        printInfo("The following hooks may interfere with Magic Context:");
        console.log("    • context-window-monitor");
        console.log("    • preemptive-compaction");
        console.log("    • anthropic-context-window-limit-recovery");
        console.log("");

        const shouldDisable = await confirm("Disable these hooks in oh-my-opencode?", true);
        if (shouldDisable) {
            disableOmoHooks(paths.omoConfig);
            printSuccess("Hooks disabled in oh-my-opencode config");
        } else {
            printWarning("Skipped — you may experience context management conflicts");
        }
    } else {
        printSuccess("No oh-my-opencode config found (no conflicts)");
    }

    // ─── Done ───────────────────────────────────────────
    console.log("");
    console.log("  ═══════════════════════════════");
    console.log("  ✨ Setup complete!");
    console.log("");
    console.log("  What was configured:");
    console.log(`    • Plugin: ${PLUGIN_NAME}`);
    console.log(`    • Compaction: disabled (Magic Context manages context)`);
    if (historianModel) console.log(`    • Historian: ${historianModel}`);
    if (dreamerEnabled)
        console.log(`    • Dreamer: enabled${dreamerModel ? ` (${dreamerModel})` : ""}`);
    if (sidekickEnabled)
        console.log(`    • Sidekick: enabled${sidekickModel ? ` (${sidekickModel})` : ""}`);
    console.log("");
    console.log("  Run 'opencode' to start!");
    console.log("");

    closePrompts();
    return 0;
}
