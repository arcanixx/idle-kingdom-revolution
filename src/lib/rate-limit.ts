import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const defaults: RateLimitConfig = {
  windowMs: 60_000,
  maxRequests: 100,
};

const store = new Map<string, RateLimitEntry>();

function getKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "127.0.0.1";
  return ip;
}

export function rateLimit(
  request: NextRequest,
  config: Partial<RateLimitConfig> = {}
): { passed: boolean; remaining: number; resetAt: number } {
  const { windowMs, maxRequests } = { ...defaults, ...config };
  const key = getKey(request);
  const now = Date.now();
  let entry = store.get(key);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    store.set(key, entry);
  }
  entry.count++;
  const remaining = Math.max(0, maxRequests - entry.count);
  if (entry.count > maxRequests) {
    return { passed: false, remaining: 0, resetAt: entry.resetAt };
  }
  return { passed: true, remaining, resetAt: entry.resetAt };
}

export function withRateLimit(
  request: NextRequest,
  handler: () => Promise<NextResponse>,
  config: Partial<RateLimitConfig> = {}
): Promise<NextResponse> {
  const result = rateLimit(request, config);
  if (!result.passed) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(retryAfter));
    response.headers.set("X-RateLimit-Remaining", "0");
    return Promise.resolve(response);
  }
  return handler();
}

export function clearRateLimitStore(): void {
  store.clear();
}

export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key);
  }
}

setInterval(cleanupExpiredEntries, 60_000);
