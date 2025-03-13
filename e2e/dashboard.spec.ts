import { test, expect } from '@playwright/test';

// https://playwright.dev/docs/intro
test("visite l'URL racine de l'application et navigue vers la page du tableau de bord", async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Tableau de bord');
  await expect(page.locator('img.logo')).toHaveAttribute('src', '/src/assets/logo-complet.webp');
  await page.click('a.btn');
  await expect(page.locator('h1')).toHaveText("Suivi des ventes de Magic'Pills");
});
