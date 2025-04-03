import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  // Utiliser une base dynamique en fonction de l'environnement
  base: process.env.NODE_ENV === 'production' ? '/magicpills-dashboard/' : '/',
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
});
