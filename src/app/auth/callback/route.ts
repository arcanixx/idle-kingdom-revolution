import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  if (code) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { getAll() { return cookieStore.getAll(); }, setAll(cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[]) { cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: Record<string, unknown> }) => cookieStore.set(name, value, options)); } } }
      );
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        logger.info("OAuth callback success", "auth/callback/route.ts", "GET", { next });
        return NextResponse.redirect(new URL(next, request.url));
      }
      logger.warn("OAuth callback: exchangeCodeForSession failed", "auth/callback/route.ts", "GET", { error: error?.message });
    } catch (err) {
      logger.error("OAuth callback error", "auth/callback/route.ts", "GET", err, { code: code?.substring(0, 8) });
    }
  }
  return NextResponse.redirect(new URL("/login", request.url));
}
