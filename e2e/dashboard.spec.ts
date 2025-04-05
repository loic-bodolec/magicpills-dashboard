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

  // Vérifie que le paragraphe contient les deux parties du texte
  const paragraph = page.locator('p.superhero');
  const spans = paragraph.locator('span'); // Sélectionne tous les <span> dans le paragraphe
  await expect(spans.nth(0)).toHaveText('Juste une pilule...');
  await expect(spans.nth(1)).toHaveText('et BOOM, t’es un héros !');

  // Clique sur le bouton pour naviguer vers le tableau de bord
  await page.click('a.btn');

  // Vérifie que le titre de la page du tableau de bord est correct
  await expect(page.locator('h1')).toHaveText("Suivi des ventes de Magic'Pills");
});
