import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createApiClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value; },
        set(name, value, opts) { cookieStore.set(name, value, opts); },
        remove(name, opts) { cookieStore.set(name, "", opts); },
      },
    }
  );
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}