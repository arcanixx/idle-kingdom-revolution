import { NextRequest } from "next/server";
import { jsonResponse, errorResponse } from "@/lib/supabase/api-helper";
import { withErrorHandler } from "@/lib/api/validation-middleware";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

function sanitize(s: string): string {
  return s.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").slice(0, 200);
}

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const body = await request.json();
    const { level, message, file, functionName, stack, metadata } = body;
    if (!level || !message) return errorResponse("Missing fields", 400);

    const date = new Date().toISOString().slice(0, 10);
    const dir = join(process.cwd(), "logs");
    await mkdir(dir, { recursive: true });
    const logFile = join(dir, date + ".log");

    // Build entry line (plain text, not JSON-in-JSON)
    const ts = new Date().toISOString();
    const lines = [
      "---",
      "timestamp: " + ts,
      "level: " + level,
      "message: " + sanitize(message),
      "file: " + (file || "unknown"),
      "function: " + (functionName || "unknown"),
    ];
    if (stack) lines.push("stack: " + stack);
    if (metadata) lines.push("metadata: " + JSON.stringify(metadata).slice(0, 500));
    lines.push("---\n");

    await writeFile(logFile, lines.join("\n") + "\n", { flag: "a" });
    return jsonResponse({ ok: true });
  }, "api/logs/POST");
}

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const { readdir, readFile } = await import("fs/promises");
    const { join } = await import("path");
    const dir = join(process.cwd(), "logs");
    let files: string[];
    try { files = await readdir(dir); } catch { files = []; }
    files.sort().reverse();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 5, 20);
    const level = searchParams.get("level") || "ERROR";
    const errors: any[] = [];

    for (const f of files.slice(0, limit)) {
      const content = await readFile(join(dir, f), "utf8");
      const entries = content.split("---").filter(Boolean);
      for (const entry of entries) {
        if (entry.includes("level: " + level) || level === "ALL") {
          errors.push({ file: f, content: entry.trim().slice(0, 300) });
        }
      }
    }
    return jsonResponse({ errors, count: errors.length, logFiles: files });
  }, "api/logs/GET");
}
