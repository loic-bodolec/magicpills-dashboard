import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';

// Fonction pour générer la configuration dynamique
export function createViteConfig(command: 'serve' | 'build') {
  return {
    base: command === 'build' ? '/magicpills-dashboard/' : '/', // Base dynamique
    plugins: [
      vue(),
      vueDevTools(),
      vuetify({
        autoImport: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
}

// Configuration par défaut pour Vite
export default defineConfig(({ command }) => createViteConfig(command));
