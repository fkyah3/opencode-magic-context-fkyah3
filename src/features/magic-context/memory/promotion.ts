import type { Database } from "bun:sqlite";
import { log } from "../../../shared/logger";
import { CATEGORY_DEFAULT_TTL, PROMOTABLE_CATEGORIES } from "./constants";
import { embedText, getEmbeddingModelId } from "./embedding";
import { computeNormalizedHash } from "./normalize-hash";
import { getMemoryByHash, insertMemory, updateMemorySeenCount } from "./storage-memory";
import { saveEmbedding } from "./storage-memory-embeddings";
import type { MemoryCategory, MemoryInput } from "./types";

interface SessionFact {
    category: string;
    content: string;
}

function isPromotableCategory(category: string): category is MemoryCategory {
    return PROMOTABLE_CATEGORIES.some((promotableCategory) => promotableCategory === category);
}

function resolveExpiresAt(category: MemoryCategory): number | null {
    const ttl = CATEGORY_DEFAULT_TTL[category];
    return ttl === undefined ? null : Date.now() + ttl;
}

/**
 * Promote eligible session facts to cross-session memories.
 * Called after replaceAllCompartmentState() commits.
 * Uses normalized_hash for fast dedup. Async embedding runs post-commit.
 */
export function promoteSessionFactsToMemory(
    db: Database,
    sessionId: string,
    projectPath: string,
    facts: SessionFact[],
): void {
    try {
        for (const fact of facts) {
            if (!isPromotableCategory(fact.category)) {
                continue;
            }

            const normalizedHash = computeNormalizedHash(fact.content);
            const existingMemory = getMemoryByHash(db, projectPath, fact.category, normalizedHash);

            if (existingMemory) {
                updateMemorySeenCount(db, existingMemory.id);
                continue;
            }

            const memoryInput: MemoryInput = {
                projectPath,
                category: fact.category,
                content: fact.content,
                sourceSessionId: sessionId,
                sourceType: "historian",
                expiresAt: resolveExpiresAt(fact.category),
            };

            const memory = insertMemory(db, memoryInput);
            void embedAndStoreMemory(db, memory.id, memory.content);
        }
    } catch (error) {
        log(`[magic-context] memory promotion failed for session ${sessionId}:`, error);
    }
}

async function embedAndStoreMemory(db: Database, memoryId: number, content: string): Promise<void> {
    try {
        const embedding = await embedText(content);
        if (embedding) {
            saveEmbedding(db, memoryId, embedding, getEmbeddingModelId());
        }
    } catch (error) {
        log(`[magic-context] memory embedding failed for memory ${memoryId}:`, error);
    }
}
