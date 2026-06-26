import { test, expect } from "@playwright/test";

test.describe("Battle Flow", () => {
  test("should navigate to battle page", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page).toHaveTitle(/Idle Kingdom/);
  });

  test("should display battle start button", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page.locator("text=Battle Start")).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should switch languages", async ({ page }) => {
    await page.goto("/");
    await page.locator("button:has-text('EN')").click();
    await page.locator("button:has-text('PL')").click();
    // Verify Polish text appears
    await expect(page.locator("text=Gra")).toBeVisible();
  });
});
