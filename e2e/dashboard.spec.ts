import { test, expect } from '@playwright/test';

// https://playwright.dev/docs/intro
test("visite l'URL racine de l'application et navigue vers la page du tableau de bord", async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('img.logo')).toHaveAttribute(
    'src',
    '/magicpills-dashboard/src/assets/logo-complet.webp',
  );
  await expect(page.locator('p')).toHaveText('Juste une pilule... et BOOM, t’es un héros !');
  await page.click('a.btn');
  await expect(page.locator('h1')).toHaveText("Suivi des ventes de Magic'Pills");
});
