import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const logFile = path.join(os.tmpdir(), "magic-context.log");
const isTestEnv = process.env.NODE_ENV === "test";

// Intentional: appendFileSync is used instead of async I/O to guarantee log ordering
// across rapid sequential calls. The cost is ~0.1ms per call on SSD, acceptable for
// the ~20-50 log calls per transform pass. Buffered async would risk log loss on crash
// and complicate ordering. See audit finding #4.

export function log(message: string, data?: unknown): void {
    if (isTestEnv) return;
    try {
        const timestamp = new Date().toISOString();
        const serialized = data === undefined ? "" : ` ${JSON.stringify(data)}`;
        fs.appendFileSync(logFile, `[${timestamp}] ${message}${serialized}\n`);
    } catch (_error) {
        return;
    }
}

export function sessionLog(sessionId: string, message: string, data?: unknown): void {
    log(`[magic-context][${sessionId}] ${message}`, data);
}

export function getLogFilePath(): string {
    return logFile;
}
