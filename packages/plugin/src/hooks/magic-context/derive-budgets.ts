/**
 * Budget derivation
 *
 * Two scaling bases, two clamps. Replaces the old static
 * `compartment_token_budget` setting which tried to serve both roles
 * and scaled with neither model.
 *
 *   - triggerBudget: scales with (main model × executeThreshold).
 *     Drives size-based historian triggers (`tail_size`, `commit_clusters`).
 *     "How big can the uncompartmentalized tail get before we force
 *     historian to run." This is anchored to the MAIN model's usable
 *     working space, not its total context.
 *
 *   - historianChunkTokens: scales with the HISTORIAN model's context.
 *     The raw-history window historian processes per call. Different
 *     scaling basis because historian is a single-shot summarizer bound
 *     by its own context, not the main session's pressure math.
 */

import { HISTORIAN_AGENT } from "../../agents/historian";
import {
    AGENT_MODEL_REQUIREMENTS,
    expandFallbackChain,
} from "../../shared/model-requirements";
import { getModelsDevContextLimit } from "../../shared/models-dev-cache";

// 5% of (main_context × execute_threshold) is the "working usable × 5%" basis.
// This preserves the legacy static behavior for 1M × 40% (60K tail_size ≈ 15%
// of usable) while fixing the small-context regression where the old 60K tail
// threshold was 72% of usable on 128K × 65%.
const TRIGGER_BUDGET_PERCENTAGE = 0.05;
const TRIGGER_BUDGET_MIN = 5_000;
const TRIGGER_BUDGET_MAX = 50_000;

const HISTORIAN_CHUNK_PERCENTAGE = 0.25;
const HISTORIAN_CHUNK_MIN = 8_000;
const HISTORIAN_CHUNK_MAX = 50_000;

const DEFAULT_HISTORIAN_CONTEXT_FALLBACK = 128_000;

/**
 * Budget basis for size-based historian triggers (tail_size, commit_clusters).
 * Anchored to the MAIN model's usable working space, not its total context.
 *
 * @param mainContextLimit Main session model's context window (tokens).
 * @param executeThresholdPercentage The effective execute threshold (0-100).
 */
export function deriveTriggerBudget(
    mainContextLimit: number,
    executeThresholdPercentage: number,
): number {
    if (!Number.isFinite(mainContextLimit) || mainContextLimit <= 0) {
        return TRIGGER_BUDGET_MIN;
    }
    const thresholdFraction = Math.max(0, Math.min(executeThresholdPercentage, 100)) / 100;
    const usable = mainContextLimit * thresholdFraction;
    const derived = Math.round(usable * TRIGGER_BUDGET_PERCENTAGE);
    return Math.max(TRIGGER_BUDGET_MIN, Math.min(TRIGGER_BUDGET_MAX, derived));
}

/**
 * Raw-history chunk budget for historian's own context window.
 * Historian formats tool calls as compact `TC:` summaries and drops tool results,
 * so a 50K-token chunk typically represents far more raw messages than its token
 * count implies. The max is tuned around that compression.
 *
 * @param historianContextLimit Historian model's context window (tokens).
 */
export function deriveHistorianChunkTokens(historianContextLimit: number): number {
    if (!Number.isFinite(historianContextLimit) || historianContextLimit <= 0) {
        return HISTORIAN_CHUNK_MIN;
    }
    const derived = Math.round(historianContextLimit * HISTORIAN_CHUNK_PERCENTAGE);
    return Math.max(HISTORIAN_CHUNK_MIN, Math.min(HISTORIAN_CHUNK_MAX, derived));
}

/**
 * Resolve the historian model's context limit.
 *
 * Priority:
 *   1. Explicit `historian.model` config ("provider/model-id")
 *   2. First entry of the historian fallback chain
 *   3. Conservative 128K default
 */
export function resolveHistorianContextLimit(
    historianModelOverride?: string,
    modelContextLimitsCache?: Map<string, number>,
): number {
    const modelKey = pickHistorianModelKey(historianModelOverride);
    if (!modelKey) {
        return DEFAULT_HISTORIAN_CONTEXT_FALLBACK;
    }

    const [providerID, ...rest] = modelKey.split("/");
    const modelID = rest.join("/");
    if (!providerID || !modelID) {
        return DEFAULT_HISTORIAN_CONTEXT_FALLBACK;
    }

    // User-configured override wins
    const userOverride = modelContextLimitsCache?.get(modelKey);
    if (typeof userOverride === "number" && userOverride > 0) {
        return userOverride;
    }

    const fromModelsDev = getModelsDevContextLimit(providerID, modelID);
    if (typeof fromModelsDev === "number" && fromModelsDev > 0) {
        return fromModelsDev;
    }

    return DEFAULT_HISTORIAN_CONTEXT_FALLBACK;
}

function pickHistorianModelKey(override?: string): string | undefined {
    if (typeof override === "string" && override.includes("/")) {
        return override;
    }
    const chain = AGENT_MODEL_REQUIREMENTS[HISTORIAN_AGENT]?.fallbackChain;
    if (!chain || chain.length === 0) return undefined;
    const expanded = expandFallbackChain(chain);
    return expanded[0];
}
