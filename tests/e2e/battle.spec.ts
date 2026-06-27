import { test, expect } from "@playwright/test";

test.describe("Battle Flow", () => {
  test("should navigate to battle page", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page).toHaveTitle(/Idle Kingdom/);
  });

  test("should display battle start button", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page.locator("text=Start Battle")).toBeVisible();
  });

  test("should display field selector", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page.locator("select")).toBeVisible();
  });

  test("should display difficulty buttons", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page.locator("button:has-text('Easy')")).toBeVisible();
    await expect(page.locator("button:has-text('Normal')")).toBeVisible();
    await expect(page.locator("button:has-text('Hard')")).toBeVisible();
  });

  test("should show battle log area", async ({ page }) => {
    await page.goto("/game/battle");
    await expect(page.locator("h2:has-text('Battle Log')")).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should switch languages", async ({ page }) => {
    await page.goto("/");
    await page.locator("button:has-text('EN')").click();
    await page.locator("button:has-text('PL')").click();
    await expect(page.locator("text=Gra")).toBeVisible();
  });

  test("should navigate to army page", async ({ page }) => {
    await page.goto("/game/army");
    await expect(page.locator("h1:has-text('Army')")).toBeVisible();
  });

  test("should navigate to mining page", async ({ page }) => {
    await page.goto("/game/mining");
    await expect(page.locator("h1:has-text('Deep Mine')")).toBeVisible();
  });

  test("should navigate to quests page", async ({ page }) => {
    await page.goto("/game/quests");
    await expect(page.locator("h1:has-text('Quests')")).toBeVisible();
  });

  test("should navigate to leaderboard page", async ({ page }) => {
    await page.goto("/game/leaderboard");
    await expect(page.locator("h1:has-text('Leaderboard')")).toBeVisible();
  });

  test("should navigate to valor page", async ({ page }) => {
    await page.goto("/game/valor");
    await expect(page.locator("h1:has-text('Valor')")).toBeVisible();
  });
});
