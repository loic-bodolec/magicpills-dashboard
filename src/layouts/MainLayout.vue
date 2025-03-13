<template>
  <v-app>
    <NavigationDrawer />
    <v-main class="main-container">
      <router-view></router-view>
      <!-- Display view pages here based on route -->
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from '@/components/NavigationDrawer/NavigationDrawer.vue';
</script>

<style lang="scss">
/* Add your styles here */
</style>
