<template>
  <div v-if="dashboardStore.isLoading" role="alert" aria-live="assertive">Chargement...</div>
  <div v-else class="dashboard">
    <h1 class="dashboard-title" aria-label="Tableau de bord du suivi des ventes">Suivi des ventes de Magic'Pills</h1>

    <!-- Cartes KPI -->
    <div class="kpi-cards" role="region" aria-labelledby="kpi-cards-title">
      <KpiCard
        v-if="dashboardStore.conversionRate.length"
        title="Taux de conversion"
        :value="dashboardStore.conversionRate[0].value + ' %'"
        :subtitle="`Visiteurs : ${dashboardStore.salesStats[0]?.value || 0}, Héros créés : ${dashboardStore.salesStats[1]?.value || 0}`"
        icon="mdi-percent-outline"
        iconColor="#fa9100"
        :tooltip="tooltips.conversion"
      />
      <KpiCard
        v-if="dashboardStore.crimePrevention.length"
        title="Crimes évités"
        :value="dashboardStore.crimePrevention[0].value"
        icon="mdi-shield-check-outline"
        iconColor="#fa9100"
        :tooltip="tooltips.crimePrevention"
      />
      <KpiCard
        v-if="dashboardStore.activationTime.length"
        title="Activation des pouvoirs"
        :value="dashboardStore.activationTime[0].value + ' min'"
        icon="mdi-timer-outline"
        iconColor="#fa9100"
        :tooltip="tooltips.activationTime"
      />
      <KpiCard
        v-if="dashboardStore.powerDuration.length"
        title="Durée moyenne des pouvoirs"
        :value="dashboardStore.powerDuration[0].value + ' heures'"
        icon="mdi-clock-outline"
        iconColor="#fa9100"
        :tooltip="tooltips.powerDuration"
      />
      <KpiCard
        v-if="averageReviewValues"
        title="Moyenne des avis"
        :value="averageReviewValues + ' / 5'"
        icon="mdi-star-outline"
        iconColor="#fa9100"
        :tooltip="tooltips.review"
      />
      <KpiCard
        v-if="dashboardStore.sideEffectRate.length"
        title="Effets secondaires"
        :value="dashboardStore.sideEffectRate[0].value + ' %'"
        icon="mdi-alert-outline"
        iconColor="#fa9100"
        :tooltip="tooltips.sideEffects"
      />
    </div>

    <!-- Graphiques -->
    <div class="charts" role="region" aria-labelledby="charts-title">
      <KpiChart
        v-if="dashboardStore.powerDurationByType.length"
        title="Durée moyenne des pouvoirs par type (en heures)"
        :labels="dashboardStore.powerDurationByType.map(item => item.power)"
        :values="dashboardStore.powerDurationByType.map(item => item.value)"
        chartType="bar"
      />
      <KpiChart
        v-if="dashboardStore.powersSold.length"
        title="Répartition des pouvoirs vendus"
        :labels="dashboardStore.powersSold.map(power => power.power)"
        :values="dashboardStore.powersSold.map(power => power.value)"
        chartType="pie"
      />
      <KpiChart
        v-if="dashboardStore.customerReviews.length"
        title="Nombre d'avis laissés"
        :labels="dashboardStore.customerReviews.map(review => review.rating)"
        :values="dashboardStore.customerReviews.map(review => review.value)"
        chartType="bar"
      />
      <KpiChart
        v-if="dashboardStore.salesPerDay.length"
        title="Ventes de pilules par jour"
        :labels="dashboardStore.salesPerDay.map(day => day.day)"
        :values="dashboardStore.salesPerDay.map(day => day.value)"
        chartType="bar"
      />
    </div>

    <p v-if="dashboardStore.isError" class="error-message">
      Erreur lors du chargement des données : {{ dashboardStore.errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import KpiChart from "@/components/KpiChart/KpiChart.vue";
import KpiCard from "@/components/KpiCard/KpiCard.vue";

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchDashboardData();
});

// Calcul de la moyenne des avis
const averageReviewValues = computed<number>(() => {
  let totalReviews = 0;
  let totalWeight = 0;
  dashboardStore.customerReviews.forEach((review, index) => {
    totalReviews += review.value * (index + 1); // index + 1 correspond à la note de l'avis (1 à 5)
    totalWeight += review.value;
  });
  return totalWeight > 0 ? parseFloat((totalReviews / totalWeight).toFixed(2)) : 0;
});

// Définition des tooltips
const tooltips = {
  conversion: "Ce taux correspond au pourcentage de visiteurs ayant acheté une pilule.",
  crimePrevention: "Nombre de crimes évités grâce aux super-héros créés.",
  activationTime: "Temps moyen avant que les pouvoirs ne s'activent.",
  powerDuration: "Durée moyenne pendant laquelle les pouvoirs restent actifs.",
  review: "Les avis des clients sont notés de 1 à 5 étoiles.",
  sideEffects: "Pourcentage de clients ayant signalé des effets secondaires.",
};
</script>

<style scoped lang="scss">
/* style dans dashboard.scss */
</style>
