<template>
  <!-- Barre d'application pour mobile -->
  <v-app-bar v-if="isMobile" app class="app-bar-mobile">
    <v-app-bar-nav-icon @click="drawer = !drawer" aria-label="Ouvrir le menu" />
    <v-toolbar-title>Magic'Pills</v-toolbar-title>
  </v-app-bar>

  <!-- Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    :rail="isCompact"
    :temporary="isMobile"
    :permanent="!isMobile"
    @click="isCompact = false"
    class="custom-drawer"
    role="navigation"
    aria-labelledby="drawer-title"
  >
    <!-- Logo -->
    <v-list-item v-if="!isMobile" class="logo-container">
      <div class="logo-container-drawer">
        <img src="@/assets/logo-complet.webp" alt="Logo Magic'Pills, lien vers la page d'accueil" class="logo-drawer" />
        <span class="brand-drawer" v-if="!isCompact">Magic'Pills</span>
      </div>
      <template v-slot:append>
        <v-btn
          id="toggle-drawer-btn"
          :icon="isCompact ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          @click.stop="isCompact = !isCompact"
          :aria-label="isCompact ? 'Ouvrir le tiroir' : 'Fermer le tiroir'"
        />
      </template>
    </v-list-item>

    <v-divider />

    <!-- Navigation -->
    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.path"
        :class="{ 'active-item': $route.path === item.path }"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="$router.push(item.path)"
        :aria-label="`Aller à ${item.title}`"
        :aria-current="$route.path === item.path ? 'page' : undefined"
        role="link"
        tabindex="0"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// États réactifs
const drawer = ref(true);
const isCompact = ref(false);
const isMobile = ref(window.innerWidth <= 768);

// Fonction pour mettre à jour l'affichage
const updateScreenSize = () => {
  const wasMobile = isMobile.value;
  isMobile.value = window.innerWidth <= 768;

  if (isMobile.value && !wasMobile) {
    // Si on vient de passer en mobile, s'assurer que le rail est désactivé
    isCompact.value = false;
  }

  // Si on est en desktop, s'assurer que le drawer est ouvert
  drawer.value = !isMobile.value;
};

// Ajout / Suppression de l'écouteur d'événements
onMounted(() => {
  updateScreenSize(); // Vérification initiale
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

// Définition des éléments de navigation
const navItems = [
  { title: 'Accueil', path: '/', icon: 'mdi-home-city' },
  { title: 'Tableau de bord', path: '/app/dashboard', icon: 'mdi-view-dashboard-outline' },
  { title: 'Avis clients', path: '/app/reviews', icon: 'mdi-comment-multiple-outline' },
  { title: 'Nouveautés', path: '/app/news', icon: 'mdi-newspaper-variant-outline' },
  { title: 'Utilisateurs', path: '/app/users', icon: 'mdi-account-group-outline' },
  { title: 'Mon compte', path: '/app/account', icon: 'mdi-account' },
];
</script>

<style scoped lang="scss">
/* style dans navigationDrawer.scss */
</style>
