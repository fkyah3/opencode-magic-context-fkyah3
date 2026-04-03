import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parse, stringify } from "comment-json";
import { detectConflicts } from "../shared/conflict-detector";
import { fixConflicts } from "../shared/conflict-fixer";
import { ensureTuiPluginEntry } from "../shared/tui-config";
import { detectConfigPaths } from "./config-paths";
import { isOpenCodeInstalled } from "./opencode-helpers";
import { intro, log, outro } from "./prompts";

const PLUGIN_NAME = "@cortexkit/opencode-magic-context";

export async function runDoctor(): Promise<number> {
    intro("Magic Context Doctor");

    let issues = 0;
    let fixed = 0;

    // 1. Check OpenCode is installed
    if (!isOpenCodeInstalled()) {
        log.error("OpenCode is not installed or not in PATH");
        outro("Doctor failed — install OpenCode first");
        return 1;
    }
    log.success("OpenCode installed");

    // 2. Check config paths exist
    const paths = detectConfigPaths();

    if (paths.opencodeConfigFormat === "none") {
        log.error(`No opencode.json found at ${paths.opencodeConfig}`);
        issues++;
    } else {
        log.success(`OpenCode config: ${paths.opencodeConfig}`);
    }

    // 3. Check magic-context.jsonc exists
    if (existsSync(paths.magicContextConfig)) {
        log.success(`Magic Context config: ${paths.magicContextConfig}`);
    } else {
        log.warn(`No magic-context.jsonc found — using defaults`);
        log.info("  Run 'setup' to create one with model recommendations");
    }

    // 4. Check plugin is in opencode.json
    if (paths.opencodeConfigFormat !== "none") {
        try {
            const raw = readFileSync(paths.opencodeConfig, "utf-8");
            const config = parse(raw) as Record<string, unknown>;
            const plugins = Array.isArray(config?.plugin) ? config.plugin : [];
            const hasPlugin = (plugins as unknown[]).some(
                (p: unknown) =>
                    typeof p === "string" &&
                    (p === PLUGIN_NAME ||
                        p.startsWith(`${PLUGIN_NAME}@`) ||
                        p.includes("opencode-magic-context")),
            );
            const configName =
                paths.opencodeConfigFormat === "jsonc" ? "opencode.jsonc" : "opencode.json";
            if (hasPlugin) {
                log.success(`Plugin registered in ${configName}`);
            } else {
                // Auto-add plugin entry — preserves comments
                const updatedPlugins = [...(plugins as unknown[]), PLUGIN_NAME];
                config.plugin = updatedPlugins;
                writeFileSync(paths.opencodeConfig, `${stringify(config, null, 2)}\n`);
                log.success(`Added plugin to ${configName}`);
                fixed++;
            }
        } catch {
            log.warn("Could not parse opencode config to verify plugin entry");
        }
    }

    // 5. Check for conflicts
    const cwd = process.cwd();
    const conflictResult = detectConflicts(cwd);

    if (conflictResult.hasConflict) {
        for (const reason of conflictResult.reasons) {
            log.error(`Conflict: ${reason}`);
        }
        // Auto-fix conflicts
        const actions = fixConflicts(cwd, conflictResult.conflicts);
        for (const action of actions) {
            log.success(`Fixed: ${action}`);
            fixed++;
        }
        // Only count unfixed conflicts as issues
        issues += conflictResult.reasons.length - actions.length;

        if (actions.length > 0) {
            log.warn("Restart OpenCode for conflict fixes to take effect");
        }
    } else {
        log.success("No conflicts detected (compaction, DCP, OMO hooks)");
    }

    // 6. Check tui.json
    const tuiAdded = ensureTuiPluginEntry();
    if (tuiAdded) {
        log.success("Added TUI sidebar plugin to tui.json");
        log.warn("Restart OpenCode to see the sidebar");
        fixed++;
    } else {
        // Check if it's already there vs missing tui.json entirely
        if (existsSync(paths.tuiConfig)) {
            log.success("TUI sidebar plugin configured");
        } else {
            log.success("TUI sidebar plugin configured (tui.json created)");
        }
    }

    // 7. Check OMO config
    if (paths.omoConfig) {
        log.info(`OMO config found: ${paths.omoConfig}`);
    }

    // Summary
    console.log("");
    if (issues === 0 && fixed === 0) {
        outro("Everything looks good! ✨");
    } else if (issues > 0 && fixed > 0) {
        outro(`Found ${issues} issue(s), fixed ${fixed}. Restart OpenCode to apply.`);
    } else if (fixed > 0) {
        outro(`Fixed ${fixed} issue(s). Restart OpenCode to apply.`);
    } else {
        outro(`Found ${issues} issue(s) that need manual attention.`);
        return 1;
    }

    return 0;
}
