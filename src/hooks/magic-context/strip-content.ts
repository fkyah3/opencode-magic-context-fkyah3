import { isRecord } from "../../shared/record-type-guard";
import type { MessageLike, ThinkingLikePart } from "./tag-messages";

const DROPPED_PLACEHOLDER_PATTERN = /^\[dropped §\d+§\]$/;

/**
 * Remove messages that consist entirely of [dropped §N§] placeholders.
 * These are leftover shells after ctx_reduce drops their content — keeping them
 * wastes tokens without providing any value since there is no recall mechanism.
 */
export function stripDroppedPlaceholderMessages(messages: MessageLike[]): number {
    let stripped = 0;
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.parts.length === 0) continue;

        const allDropped = msg.parts.every((part) => {
            if (!isRecord(part) || part.type !== "text" || typeof part.text !== "string") {
                return false;
            }
            // A message may contain multiple dropped placeholders, e.g. "[dropped §1§][dropped §2§]"
            const trimmed = part.text.trim();
            if (trimmed.length === 0) return true;
            return trimmed
                .split(/(?=\[dropped §)/)
                .every((segment) => DROPPED_PLACEHOLDER_PATTERN.test(segment.trim()));
        });

        if (allDropped) {
            messages.splice(i, 1);
            stripped++;
        }
    }
    return stripped;
}

export function clearOldReasoning(
    messages: MessageLike[],
    reasoningByMessage: Map<MessageLike, ThinkingLikePart[]>,
    messageTagNumbers: Map<MessageLike, number>,
    clearReasoningAge: number,
): number {
    const maxTag = findMaxTag(messageTagNumbers);
    if (maxTag === 0) return 0;

    const ageCutoff = maxTag - clearReasoningAge;
    let cleared = 0;

    for (const message of messages) {
        const msgTag = messageTagNumbers.get(message) ?? 0;
        if (msgTag === 0 || msgTag > ageCutoff) continue;

        const parts = reasoningByMessage.get(message);
        if (!parts) continue;

        for (const tp of parts) {
            if (tp.thinking !== undefined && tp.thinking !== "[cleared]") {
                tp.thinking = "[cleared]";
                cleared++;
            }
            if (tp.text !== undefined && tp.text !== "[cleared]") {
                tp.text = "[cleared]";
                cleared++;
            }
        }
    }

    return cleared;
}

function findMaxTag(messageTagNumbers: Map<MessageLike, number>): number {
    let max = 0;
    for (const tag of messageTagNumbers.values()) {
        if (tag > max) max = tag;
    }
    return max;
}

const CLEARED_REASONING_TYPES = new Set(["thinking", "reasoning", "redacted_thinking"]);

export function stripClearedReasoning(messages: MessageLike[]): number {
    let stripped = 0;
    for (const message of messages) {
        if (message.info.role !== "assistant") continue;
        const originalLength = message.parts.length;
        const kept = message.parts.filter((part) => {
            if (!isRecord(part)) return true;
            const partType = part.type as string;
            if (!CLEARED_REASONING_TYPES.has(partType)) return true;
            const thinking = "thinking" in part ? (part.thinking as string | undefined) : undefined;
            const text = "text" in part ? (part.text as string | undefined) : undefined;
            return (
                (thinking !== undefined && thinking !== "[cleared]") ||
                (text !== undefined && text !== "[cleared]")
            );
        });
        if (kept.length < originalLength) {
            message.parts.length = 0;
            message.parts.push(...kept);
            stripped += originalLength - kept.length;
        }
    }
    return stripped;
}

const INLINE_THINKING_PATTERN = /<(?:thinking|think)>[\s\S]*?<\/(?:thinking|think)>\s*/g;

export function stripInlineThinking(
    messages: MessageLike[],
    messageTagNumbers: Map<MessageLike, number>,
    clearReasoningAge: number,
): number {
    const maxTag = findMaxTag(messageTagNumbers);
    if (maxTag === 0) return 0;

    const ageCutoff = maxTag - clearReasoningAge;
    let stripped = 0;

    for (const message of messages) {
        if (message.info.role !== "assistant") continue;
        const msgTag = messageTagNumbers.get(message) ?? 0;
        if (msgTag === 0 || msgTag > ageCutoff) continue;

        for (const part of message.parts) {
            if (!isRecord(part) || part.type !== "text" || typeof part.text !== "string") continue;
            const cleaned = (part.text as string).replace(INLINE_THINKING_PATTERN, "");
            if (cleaned !== part.text) {
                part.text = cleaned;
                stripped++;
            }
        }
    }
    return stripped;
}

export function truncateErroredTools(
    messages: MessageLike[],
    watermark: number,
    messageTagNumbers: Map<MessageLike, number>,
): number {
    let truncated = 0;
    for (let i = 0; i < messages.length; i++) {
        const maxTag = messageTagNumbers.get(messages[i]) ?? 0;
        if (maxTag > watermark) {
            continue;
        }

        for (const part of messages[i].parts) {
            if (!isRecord(part) || part.type !== "tool" || !isRecord(part.state)) {
                continue;
            }
            if (part.state.status !== "error") {
                continue;
            }
            if (typeof part.state.error === "string" && part.state.error.length > 100) {
                part.state.error = `${part.state.error.slice(0, 100)}... [truncated]`;
                truncated++;
            }
        }
    }
    return truncated;
}

export function stripProcessedImages(
    messages: MessageLike[],
    watermark: number,
    messageTagNumbers: Map<MessageLike, number>,
): number {
    let stripped = 0;
    let hasAssistantResponse = false;

    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg.info.role === "assistant") {
            hasAssistantResponse = true;
            continue;
        }
        if (msg.info.role !== "user" || !hasAssistantResponse) {
            continue;
        }

        const maxTag = messageTagNumbers.get(msg) ?? 0;
        if (maxTag > watermark) {
            continue;
        }

        for (let j = msg.parts.length - 1; j >= 0; j--) {
            const part = msg.parts[j];
            if (!isRecord(part) || part.type !== "file") {
                continue;
            }
            if (typeof part.mime !== "string" || !part.mime.startsWith("image/")) {
                continue;
            }
            if (
                typeof part.url === "string" &&
                part.url.startsWith("data:") &&
                part.url.length > 200
            ) {
                msg.parts.splice(j, 1);
                stripped++;
            }
        }
    }

    return stripped;
}
