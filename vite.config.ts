import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';
import baseUrl from './src/config/baseUrl'; // Importer baseUrl

export default defineConfig({
  // TODO Utiliser une base dynamique en fonction de l'environnement
  // base: process.env.NODE_ENV === 'production' ? '/magicpills-dashboard/' : '/',
  base: '/',
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
