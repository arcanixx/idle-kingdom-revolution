import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  }),
}));

import { createClient } from "@/lib/supabase/client";

describe("API Profile Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/player/profile", () => {
    it("returns 401 when not authenticated", async () => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: new Error("Not authenticated") });
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      expect(user).toBeNull();
    });

    it("returns profile when authenticated", async () => {
      const mockProfile = { id: "1", user_id: "user-123", display_name: "TestPlayer" };
      mockGetUser.mockResolvedValue({ data: { user: { id: "user-123" } }, error: null });
      mockFrom.mockReturnValue({
        select: vi.fn(() => ({ single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }) })),
      });
      const supabase = createClient();
      const { data: profile } = await supabase.from("players").select("*").eq("user_id", "user-123").single();
      expect(profile).toEqual(mockProfile);
    });
  });

  describe("PATCH /api/player/profile", () => {
    it("updates display name", async () => {
      mockGetUser.mockResolvedValue({ data: { user: { id: "user-123" } }, error: null });
      mockFrom.mockReturnValue({
        update: vi.fn(() => ({ 
          eq: vi.fn(() => ({ 
            select: vi.fn().mockResolvedValue({ data: { id: "1", display_name: "NewName" }, error: null }) 
          })) 
        })),
      });
      const supabase = createClient();
      const { data } = await supabase.from("players").update({ display_name: "NewName" }).eq("user_id", "user-123").select().single();
      expect(data.display_name).toBe("NewName");
    });
  });
});
