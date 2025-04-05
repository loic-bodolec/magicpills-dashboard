<template>
  <div class="landing-page">
    <img src="@/assets/logo-complet.webp" alt="Magic'Pills Logo" class="logo" />
    <p class="superhero">
      <span>Juste une pilule...</span><br />
      <span class="boom">et BOOM, t’es un héros !</span>
    </p>
    <router-link to="/app/dashboard" class="btn">Voir le tableau de bord</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
/* Animation de mouvement subtil */
@keyframes subtle-move {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Style pour le texte "superhéros" */
.superhero {
  font-size: 2rem;
  font-weight: bold;
  color: #ff4500;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 1.5;
  animation: subtle-move 3s infinite ease-in-out;
}

/* Style pour le mot "BOOM" */
.boom {
  color: #007bff;
  font-size: 2.2rem;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.4);
  font-style: italic;
}
</style>
