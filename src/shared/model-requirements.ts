import { DREAMER_AGENT } from "../agents/dreamer";
import { HISTORIAN_AGENT } from "../agents/historian";
import { SIDEKICK_AGENT } from "../agents/sidekick";

/**
 * Provider-agnostic fallback chain entry.
 * Each entry specifies a model and the providers to try in priority order.
 * Modeled after oh-my-opencode's FallbackEntry pattern.
 */
export interface FallbackEntry {
    model: string;
    providers: string[];
    variant?: string;
}

export interface AgentModelRequirement {
    /** Provider-agnostic fallback chain — tried in order, each provider per model */
    fallbackChain: FallbackEntry[];
}

// Historian: quality matters, single long prompt — prefer request-based pricing (Copilot) first
const HISTORIAN_FALLBACK_CHAIN: FallbackEntry[] = [
    { model: "claude-sonnet-4-6", providers: ["github-copilot", "anthropic"] },
    { model: "minimax-m2.7", providers: ["opencode-go"] },
    { model: "glm-5", providers: ["zai-coding-plan"] },
    { model: "gpt-5.4", providers: ["openai"] },
    { model: "gemini-3.1-pro", providers: ["google"] },
];

// Dreamer: runs overnight during idle, can be slow — prefer request-based pricing first
const DREAMER_FALLBACK_CHAIN: FallbackEntry[] = [
    { model: "claude-sonnet-4-6", providers: ["github-copilot", "anthropic"] },
    { model: "gemini-3-flash", providers: ["google"] },
    { model: "glm-5", providers: ["zai-coding-plan"] },
    { model: "minimax-m2.7", providers: ["opencode-go"] },
    { model: "gpt-5.4-mini", providers: ["openai"] },
];

// Sidekick: speed is critical — fast inference providers first, no Copilot (low token count)
const SIDEKICK_FALLBACK_CHAIN: FallbackEntry[] = [
    { model: "qwen-3-235b-a22b-instruct-2507", providers: ["cerebras"] },
    { model: "gpt-5-nano", providers: ["opencode"] },
    { model: "gemini-3-flash", providers: ["google"] },
    { model: "gpt-5.4-mini", providers: ["openai"] },
];

export const AGENT_MODEL_REQUIREMENTS: Record<string, AgentModelRequirement> = {
    [HISTORIAN_AGENT]: { fallbackChain: HISTORIAN_FALLBACK_CHAIN },
    [DREAMER_AGENT]: { fallbackChain: DREAMER_FALLBACK_CHAIN },
    [SIDEKICK_AGENT]: { fallbackChain: SIDEKICK_FALLBACK_CHAIN },
};

/**
 * Expand a provider-agnostic fallback chain into a flat `provider/model` list
 * that OpenCode's agent config accepts as `fallback_models`.
 */
export function expandFallbackChain(chain: FallbackEntry[]): string[] {
    const models: string[] = [];
    for (const entry of chain) {
        for (const provider of entry.providers) {
            models.push(`${provider}/${entry.model}`);
        }
    }
    return models;
}

/**
 * Get the expanded fallback_models list for an agent.
 * Returns undefined if no requirement is defined.
 */
export function getAgentFallbackModels(agent: string): string[] | undefined {
    const requirement = AGENT_MODEL_REQUIREMENTS[agent];
    if (!requirement) return undefined;
    return expandFallbackChain(requirement.fallbackChain);
}
