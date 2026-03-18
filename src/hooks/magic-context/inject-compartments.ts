import type { Database } from "bun:sqlite";
import {
    buildCompartmentBlock,
    escapeXmlContent,
    getCompartments,
    getSessionFacts,
} from "../../features/magic-context/compartment-storage";
import { CATEGORY_PRIORITY } from "../../features/magic-context/memory/constants";
import { getMemoriesByProject } from "../../features/magic-context/memory/storage-memory";
import type { Memory, MemoryCategory } from "../../features/magic-context/memory/types";
import { getSessionNotes } from "../../features/magic-context/storage";
import { log } from "../../shared/logger";
import type { MessageLike } from "./tag-messages";

export interface PreparedCompartmentInjection {
    block: string;
    compartmentEndMessage: number;
    compartmentCount: number;
    skippedVisibleMessages: number;
    factCount: number;
    noteCount: number;
    memoryCount: number;
}

export interface CompartmentInjectionResult {
    injected: boolean;
    compartmentEndMessage: number;
    compartmentCount: number;
    skippedVisibleMessages: number;
}

function renderMemoryBlock(memories: Memory[]): string | null {
    const byCategory = new Map<MemoryCategory, Memory[]>();
    for (const m of memories) {
        const existing = byCategory.get(m.category);
        if (existing) {
            existing.push(m);
        } else {
            byCategory.set(m.category, [m]);
        }
    }

    const sections: string[] = [];
    for (const category of CATEGORY_PRIORITY) {
        const categoryMemories = byCategory.get(category);
        if (!categoryMemories || categoryMemories.length === 0) {
            continue;
        }
        sections.push(
            `<${category}>`,
            ...categoryMemories.map((m) => `- ${escapeXmlContent(m.content)}`),
            `</${category}>`,
        );
    }

    if (sections.length === 0) {
        return null;
    }

    return `<project-memory>\n${sections.join("\n")}\n</project-memory>`;
}

export function prepareCompartmentInjection(
    db: Database,
    sessionId: string,
    messages: MessageLike[],
    projectPath?: string,
): PreparedCompartmentInjection | null {
    const compartments = getCompartments(db, sessionId);
    if (compartments.length === 0) {
        return null;
    }

    const facts = getSessionFacts(db, sessionId);
    const notes = getSessionNotes(db, sessionId);

    let memoryBlock: string | undefined;
    let memoryCount = 0;
    if (projectPath) {
        // Use cached memory block to avoid cache busting on background changes (ctx_memory write, promotion).
        // Cache is cleared by replaceAllCompartmentState after historian runs (which already bust cache).
        const cached = db
            .prepare(
                "SELECT memory_block_cache, memory_block_count FROM session_meta WHERE session_id = ?",
            )
            .get(sessionId) as { memory_block_cache: string; memory_block_count: number } | null;

        if (cached?.memory_block_cache) {
            memoryBlock = cached.memory_block_cache;
            memoryCount = cached.memory_block_count;
        } else {
            const memories = getMemoriesByProject(db, projectPath, ["active", "permanent"]);
            memoryCount = memories.length;
            memoryBlock = renderMemoryBlock(memories) ?? undefined;

            // Snapshot so subsequent turns reuse the same block without cache bust
            db.prepare(
                "UPDATE session_meta SET memory_block_cache = ?, memory_block_count = ? WHERE session_id = ?",
            ).run(memoryBlock ?? "", memoryCount, sessionId);
        }
    }

    const block = buildCompartmentBlock(compartments, facts, notes, memoryBlock);
    const lastCompartment = compartments[compartments.length - 1];
    const lastEnd = lastCompartment.endMessage;
    const lastEndMessageId = lastCompartment.endMessageId;

    if (lastEndMessageId.length === 0) {
        log(
            "[magic-context] injecting legacy compartments without visible-prefix trimming because latest stored compartment has no end_message_id",
            {
                sessionId,
                compartmentCount: compartments.length,
                compartmentEndMessage: lastEnd,
            },
        );
        return {
            block,
            compartmentEndMessage: lastEnd,
            compartmentCount: compartments.length,
            skippedVisibleMessages: 0,
            factCount: facts.length,
            noteCount: notes.length,
            memoryCount,
        };
    }

    let skippedVisibleMessages = 0;
    const cutoffIndex = messages.findIndex((message) => message.info.id === lastEndMessageId);
    if (cutoffIndex >= 0) {
        skippedVisibleMessages = cutoffIndex + 1;
        const remaining = messages.slice(cutoffIndex + 1);
        messages.splice(0, messages.length, ...remaining);
    }

    return {
        block,
        compartmentEndMessage: lastEnd,
        compartmentCount: compartments.length,
        skippedVisibleMessages,
        factCount: facts.length,
        noteCount: notes.length,
        memoryCount,
    };
}

export function renderCompartmentInjection(
    sessionId: string,
    messages: MessageLike[],
    prepared: PreparedCompartmentInjection,
): CompartmentInjectionResult {
    const historyBlock = `<session-history>\n${prepared.block}\n</session-history>`;
    const firstMessage = messages[0];
    const textPart = firstMessage ? findFirstTextPart(firstMessage.parts) : null;
    if (!firstMessage || !textPart || isDroppedPlaceholder(textPart.text)) {
        messages.unshift({
            info: { role: "user", sessionID: sessionId },
            parts: [{ type: "text", text: historyBlock }],
        });
    } else {
        textPart.text = `${historyBlock}\n\n${textPart.text}`;
    }

    const memoryLabel = prepared.memoryCount > 0 ? ` + ${prepared.memoryCount} memories` : "";
    log(
        `[magic-context] injected ${prepared.compartmentCount} compartments + ${prepared.factCount} facts + ${prepared.noteCount} notes${memoryLabel} into message[0]`,
    );

    return {
        injected: true,
        compartmentEndMessage: prepared.compartmentEndMessage,
        compartmentCount: prepared.compartmentCount,
        skippedVisibleMessages: prepared.skippedVisibleMessages,
    };
}

function findFirstTextPart(parts: unknown[]): { type: string; text: string } | null {
    for (const part of parts) {
        if (part === null || typeof part !== "object") continue;
        const p = part as Record<string, unknown>;
        if (p.type === "text" && typeof p.text === "string") {
            return p as unknown as { type: string; text: string };
        }
    }
    return null;
}

function isDroppedPlaceholder(text: string): boolean {
    return /^\[dropped §\d+§\]$/.test(text.trim());
}
