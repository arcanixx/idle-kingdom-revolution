import createIntlMiddleware from 'next-intl/middleware';
import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'en'
});

export default intlMiddleware;

export function createApiClientFromRequest(request: NextRequest) {
  const allCookies = request.cookies.getAll()
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

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
