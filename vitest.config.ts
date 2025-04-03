import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import { createViteConfig } from './vite.config'; // Importez la fonction utilitaire
import path from 'path';

// Utilisez une configuration statique pour Vitest
export default mergeConfig(
  createViteConfig('build'), // Génère une configuration statique pour Vitest
  defineConfig({
    test: {
      environment: 'jsdom', // Simule un DOM pour les tests
      globals: true, // Permet d'utiliser `describe`, `it` sans les importer
      setupFiles: './src/tests/setupTests.ts', // Setup global pour Vuetify
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: path.resolve(__dirname, './'),
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'html'],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }),
);
