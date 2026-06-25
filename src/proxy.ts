import { createServerClient, serialize, parse } from "@supabase/ssr"
import type { NextRequest } from "next/server"

export function createApiClientFromRequest(request: NextRequest) {
  const cookies = request.cookies
  const allCookies = cookies.getAll()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() { return allCookies },
        setAll(cookiesToSet: { name: string; value: string; options: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
        },
      },
    }
  )
}