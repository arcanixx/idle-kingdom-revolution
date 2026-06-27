export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  file: string;
  functionName?: string;
  stack?: string;
  metadata?: Record<string, unknown>;
}

type LogTransport = (entry: LogEntry) => void;

const LOG_LEVELS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const currentLevel: LogLevel =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel)) ||
  "INFO";

const isDebugMode = (): boolean => currentLevel === "DEBUG";

const consoleTransport: LogTransport = (entry) => {
  const prefix = `[${entry.timestamp}] [${entry.level}] [${entry.file}]`;
  const extra = entry.functionName ? ` [${entry.functionName}]` : "";

  switch (entry.level) {
    case "DEBUG":
      console.debug(prefix + extra, entry.message, entry.metadata ?? "");
      break;
    case "INFO":
      console.info(prefix + extra, entry.message, entry.metadata ?? "");
      break;
    case "WARN":
      console.warn(prefix + extra, entry.message, entry.metadata ?? "");
      break;
    case "ERROR":
      console.error(prefix + extra, entry.message, entry.stack ?? "", entry.metadata ?? "");
      break;
  }
};

const emailTransport: LogTransport = (entry) => {
  if (entry.level !== "ERROR") return;
  fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  }).catch(() => {
    /* silent fail - don't loop on logger errors */
  });
};

const transports: LogTransport[] = [consoleTransport];
if (currentLevel !== "DEBUG") {
  transports.push(emailTransport);
}

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function createEntry(
  level: LogLevel,
  message: string,
  file: string,
  functionName?: string,
  error?: unknown,
  metadata?: Record<string, unknown>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    file,
    functionName,
    stack: error instanceof Error ? error.stack : undefined,
    metadata,
  };
}

function getStackFile(): string {
  const stack = new Error().stack;
  if (!stack) return "unknown";
  const lines = stack.split("\n");
  for (const line of lines) {
    const match = line.match(/at\s+(?:\S+\s+)?\(?(.*?):\d+:\d+\)?$/);
    if (match) {
      const fp = match[1];
      if (!fp.includes("logger.ts") && !fp.includes("<anonymous>")) {
        const rel = fp.replace(/^.*[/\\]src[/\\]/, "src/");
        return rel;
      }
    }
  }
  return "unknown";
}

export const logger = {
  debug(
    message: string,
    file?: string,
    functionName?: string,
    metadata?: Record<string, unknown>
  ): void {
    if (!shouldLog("DEBUG")) return;
    const entry = createEntry("DEBUG", message, file ?? getStackFile(), functionName, undefined, metadata);
    transports.forEach((t) => t(entry));
  },

  info(
    message: string,
    file?: string,
    functionName?: string,
    metadata?: Record<string, unknown>
  ): void {
    if (!shouldLog("INFO")) return;
    const entry = createEntry("INFO", message, file ?? getStackFile(), functionName, undefined, metadata);
    transports.forEach((t) => t(entry));
  },

  warn(
    message: string,
    file?: string,
    functionName?: string,
    metadata?: Record<string, unknown>
  ): void {
    if (!shouldLog("WARN")) return;
    const entry = createEntry("WARN", message, file ?? getStackFile(), functionName, undefined, metadata);
    transports.forEach((t) => t(entry));
  },

  error(
    message: string,
    file?: string,
    functionName?: string,
    error?: unknown,
    metadata?: Record<string, unknown>
  ): void {
    if (!shouldLog("ERROR")) return;
    const entry = createEntry("ERROR", message, file ?? getStackFile(), functionName, error, metadata);
    transports.forEach((t) => t(entry));
  },

  get isDebug(): boolean {
    return isDebugMode();
  },
};
