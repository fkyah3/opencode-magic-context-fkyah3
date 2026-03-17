import type { Plugin } from "@opencode-ai/plugin";

/**
 * Magic Context plugin for OpenCode.
 *
 * Cross-session memory and context management:
 * - Durable compartments, session facts, and session notes
 * - Cross-session memory with semantic search
 * - Automatic historian-driven memory promotion
 * - Context window pressure management with rolling nudges
 *
 * Config loaded from two levels (project overrides user):
 * - User:    ~/.config/opencode/magic-context.jsonc
 * - Project: <project>/.opencode/magic-context.jsonc
 */
const plugin: Plugin = async (_input) => {
  return {
    tool: {},
  };
};

export default plugin;
