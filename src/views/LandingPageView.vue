<template>
  <div class="landing-page">
    <img src="@/assets/logo-complet.webp" alt="Magic'Pills Logo" class="logo" />
    <!-- Ajout de la classe "spectacular" au paragraphe -->
    <p class="spectacular">Juste une pilule... et BOOM, t’es un héros !</p>
    <router-link to="/app/dashboard" class="btn">Voir le tableau de bord</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
/* style dans landingPage.scss */

// TODO déplacer le style dans landingPage.scss
/* Animation de battement (pulse) */
@keyframes pulse {
  0% {
    transform: scale(1);
    text-shadow: 0 0 10px #2d3282, 0 0 20px #2d3282, 0 0 30px #2d3282;
  }
  50% {
    transform: scale(1.2);
    text-shadow: 0 0 20px #2d3282, 0 0 30px #2d3282, 0 0 40px #2d3282;
  }
  100% {
    transform: scale(1);
    text-shadow: 0 0 10px #2d3282, 0 0 20px #2d3282, 0 0 30px #2d3282;
  }
}

/* Animation de scintillement */
@keyframes sparkle {
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.5);
  }
}

/* Animation de dégradé */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.spectacular {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #2d3282, #00ffff, #2d3282, #ffff00);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: pulse 2.5s infinite, gradient 4s infinite linear;
  text-align: center;
  display: inline-block;
  position: relative;
}
</style>
