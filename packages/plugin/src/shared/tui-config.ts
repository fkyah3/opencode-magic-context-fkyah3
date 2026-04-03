/**
 * Auto-configure tui.json with magic-context TUI plugin entry.
 * Called from the server plugin at startup so the TUI sidebar loads on next restart.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { parse, stringify } from "comment-json";
import { log } from "./logger";
import { getOpenCodeConfigPaths } from "./opencode-config-dir";

const PLUGIN_NAME = "@cortexkit/opencode-magic-context";

function resolveTuiConfigPath(): string {
    const configDir = getOpenCodeConfigPaths({ binary: "opencode" }).configDir;
    const jsoncPath = join(configDir, "tui.jsonc");
    const jsonPath = join(configDir, "tui.json");

    if (existsSync(jsoncPath)) return jsoncPath;
    if (existsSync(jsonPath)) return jsonPath;
    return jsonPath; // default: create tui.json
}

/**
 * Ensure tui.json has the magic-context TUI plugin entry.
 * Creates tui.json if it doesn't exist. Silently skips if already present.
 */
export function ensureTuiPluginEntry(): boolean {
    try {
        const configPath = resolveTuiConfigPath();

        let config: Record<string, unknown> = {};
        if (existsSync(configPath)) {
            const raw = readFileSync(configPath, "utf-8");
            config = (parse(raw) as Record<string, unknown>) ?? {};
        }

        const plugins = Array.isArray(config.plugin)
            ? config.plugin.filter((p): p is string => typeof p === "string")
            : [];

        if (plugins.some((p) => p === PLUGIN_NAME || p.startsWith(`${PLUGIN_NAME}@`))) {
            return false; // Already present
        }

        plugins.push(PLUGIN_NAME);
        config.plugin = plugins;

        mkdirSync(dirname(configPath), { recursive: true });
        writeFileSync(configPath, `${stringify(config, null, 2)}\n`);
        log(`[magic-context] added TUI plugin entry to ${configPath}`);
        return true;
    } catch (error) {
        log(
            `[magic-context] failed to update tui.json: ${error instanceof Error ? error.message : String(error)}`,
        );
        return false;
    }
}
