import { describe, expect, it } from "bun:test";
import {
    resolveCacheTtl,
    resolveContextLimit,
    resolveModelKey,
    resolveSessionId,
} from "./event-resolvers";

describe("event-resolvers", () => {
    describe("resolveContextLimit", () => {
        // resolveContextLimit reads from getModelsDevContextLimit (which overlays
        // opencode.json custom provider limits on top of the models.dev cache).
        // The tests below validate the fallback-to-default path. The models.dev
        // integration is covered by models-dev-cache tests.

        it("resolves anthropic context from models.dev when available", () => {
            //#when — models.dev may return 200K (real limit) or 128K (default if no models.json)
            const limit = resolveContextLimit("anthropic", "claude-opus-4-5");

            //#then — should NOT be 1M; uses models.dev real limit or conservative default
            expect(limit).toBeLessThanOrEqual(200_000);
            expect(limit).toBeGreaterThan(0);
        });

        it("returns default for missing provider", () => {
            //#when
            const limit = resolveContextLimit(undefined, "gpt-4o");

            //#then
            expect(limit).toBe(128_000);
        });

        it("returns default for unknown provider/model not in models.dev or opencode.json", () => {
            //#when
            const limit = resolveContextLimit("unknown-provider", "unknown-model-xyz");

            //#then
            expect(limit).toBe(128_000);
        });
    });

    describe("resolveCacheTtl", () => {
        it("returns direct string ttl for string config", () => {
            //#when
            const ttl = resolveCacheTtl("5m", "openai/gpt-4o");

            //#then
            expect(ttl).toBe("5m");
        });

        it("resolves provider/model and bare-model overrides", () => {
            //#given
            const cacheTtl = {
                default: "5m",
                "openai/gpt-4o": "1m",
                "gpt-4o-mini": "2m",
            };

            //#when
            const providerModel = resolveCacheTtl(cacheTtl, "openai/gpt-4o");
            const bareModel = resolveCacheTtl(cacheTtl, "openai/gpt-4o-mini");

            //#then
            expect(providerModel).toBe("1m");
            expect(bareModel).toBe("2m");
        });
    });

    describe("resolveModelKey", () => {
        it("returns provider/model when both parts exist", () => {
            expect(resolveModelKey("openai", "gpt-4o")).toBe("openai/gpt-4o");
        });

        it("returns undefined when either part is missing", () => {
            expect(resolveModelKey(undefined, "gpt-4o")).toBeUndefined();
            expect(resolveModelKey("openai", undefined)).toBeUndefined();
        });
    });

    describe("resolveSessionId", () => {
        it("prefers properties.sessionID when present", () => {
            const sessionId = resolveSessionId({
                sessionID: "ses-direct",
                info: { id: "ses-info" },
            });
            expect(sessionId).toBe("ses-direct");
        });

        it("falls back to info.sessionID and info.id", () => {
            expect(resolveSessionId({ info: { sessionID: "ses-info" } })).toBe("ses-info");
            expect(resolveSessionId({ info: { id: "ses-id" } })).toBe("ses-id");
        });
    });
});
