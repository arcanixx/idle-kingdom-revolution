import re
c = open("src/lib/supabase/api-helper.ts", encoding="utf8").read()
old = c

add_func = """export function createAdminClient() {
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

"""

c = c.replace("""export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}""", add_func + """export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}""")

if c != old:
    with open("src/lib/supabase/api-helper.ts", "w", encoding="utf8") as f:
        f.write(c)
    print("Updated api-helper.ts")
else:
    print("No change")
