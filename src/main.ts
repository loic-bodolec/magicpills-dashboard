import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import '@/styles/index.scss';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
