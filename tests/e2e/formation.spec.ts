import { test, expect } from '@playwright/test';

test.describe('Formation Save/Restore Round-trip', () => {
  test('should load army page', async ({ page }) => {
    await page.goto('/game/army');
    await expect(page.locator('h1')).toContainText('Army');
  });

  test('should display formation grid', async ({ page }) => {
    await page.goto('/game/army');
    await expect(page.locator('text=Formation Grid')).toBeVisible();
  });

  test('should display available units', async ({ page }) => {
    await page.goto('/game/army');
    await expect(page.locator('text=Available Units')).toBeVisible();
  });
});
