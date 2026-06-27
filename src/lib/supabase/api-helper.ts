import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function createApiClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, opts: any) { cookieStore.set(name, value, opts); },
        remove(name: string, opts: any) { cookieStore.set(name, "", opts); },
      },
    }
  );
}

export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_KEY || "",
    {
      cookies: {
        get(name: string) { return undefined; },
        set(name: string, value: string, opts: any) {},
        remove(name: string, opts: any) {},
      },
    }
  );
}

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}
