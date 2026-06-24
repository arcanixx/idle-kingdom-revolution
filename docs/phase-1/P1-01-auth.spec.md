# P1-01: Auth System

## Description
Full authentication flow: register, login, logout. Guest mode placeholder.

## Requirements

### Login (existing - needs cleanup)
- [x] Email + password form
- [ ] Loading state during auth
- [ ] Error display on failure
- [ ] Redirect to /dashboard on success
- [ ] Redirect to /login if already logged in (proxy handles this)

### Register (existing - needs cleanup)
- [x] Email + password + display name form
- [x] Loading state
- [x] Error display
- [x] Success message (check your email)
- [ ] Auto-create player_profile after signup

### Logout (missing)
- [ ] Button on /dashboard
- [ ] Calls supabase.auth.signOut()
- [ ] Redirect to /

### Guest Mode
- [ ] Placeholder button on /login
- [ ] Text: "Continue as Guest (coming soon)"
- [ ] Disabled / not functional

### Password Reset
- [ ] "Forgot password?" link on /login
- [ ] Placeholder: calls supabase.auth.resetPasswordForEmail

## Technical Notes
- Uses @supabase/ssr (createBrowserClient, createServerClient)
- Proxy (src/proxy.ts) handles redirect for protected routes
- Lazy Supabase client initialization (useEffect) to avoid prerender issues
- Player profile auto-creation: DB trigger on auth.users INSERT

## Acceptance Criteria
- User can register with email + password
- User receives confirmation email
- User can login
- User can logout from dashboard
- Profile row created automatically after registration
- Guest button visible but disabled
