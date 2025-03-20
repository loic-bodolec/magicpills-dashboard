// TODO continuer à implémenter les filtrages de date sur les KpiCard et KpiChart (composants et moCkDatA)
<template>
  <div v-if="dashboardStore.isLoading" role="alert" aria-live="assertive">
    Chargement...
  </div>
  <div v-else class="dashboard">
    <h1 class="dashboard-title" aria-label="Tableau de bord du suivi des ventes">
      Suivi des ventes de Magic'Pills
    </h1>

    <!-- Sélecteur de date -->
    <v-row>
      <v-col cols="12" md="3">
        <DatePicker
          v-model="startDate"
          label="Date de début"
          v-model:menu="menuStart"
        />
      </v-col>
      <v-col cols="12" md="3">
        <DatePicker
          v-model="endDate"
          label="Date de fin"
          v-model:menu="menuEnd"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="fetchData" color="primary">Filtrer</v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn @click="resetFilters" color="secondary">Réinitialiser</v-btn>
      </v-col>
    </v-row>

    <!-- Cartes KPI -->
    <div class="kpi-cards" role="region" aria-labelledby="kpi-cards-title">
      <KpiCard
        v-for="(stat, index) in kpiStats"
        :key="index"
        :title="stat.title"
        :value="stat.value"
        :subtitle="stat.subtitle"
        :icon="stat.icon"
        :iconColor="stat.iconColor"
        :tooltip="stat.tooltip"
      />
    </div>

    <!-- Graphiques -->
    <div class="charts" role="region" aria-labelledby="charts-title">
      <KpiChart
        v-for="(chart, index) in charts"
        :key="index"
        :title="chart.title"
        :labels="chart.labels"
        :values="chart.values"
        :chartType="chart.chartType"
      />
    </div>

    <p v-if="dashboardStore.isError" class="error-message">
      Erreur lors du chargement des données : {{ dashboardStore.errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import KpiChart from '@/components/KpiChart/KpiChart.vue';
import KpiCard from '@/components/KpiCard/KpiCard.vue';
import DatePicker from '@/components/DatePicker/DatePicker.vue';
import type { PowerStat, CustomerReview, SalesPerDay } from '@/types/dashboard';

const dashboardStore = useDashboardStore();

// Dates de filtrage
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const menuStart = ref(false);
const menuEnd = ref(false);

// Fonction pour récupérer les données filtrées
const fetchData = async () => {
  await dashboardStore.fetchDashboardData(startDate.value, endDate.value);
};

// Fonction pour réinitialiser les filtres
const resetFilters = async () => {
  startDate.value = null;
  endDate.value = null;
  await dashboardStore.fetchDashboardData(); // Recharge toutes les données sans filtres
};

onMounted(() => {
  dashboardStore.fetchDashboardData();
});

// Données pour les KPI Cards
const kpiStats = computed(() => [
  {
    title: dashboardStore.conversionRate?.label,
    value: `${dashboardStore.conversionRate?.value || 0} %`,
    subtitle: `Visiteurs : ${dashboardStore.salesStats[0]?.value || 0}, Héros créés : ${dashboardStore.salesStats[1]?.value || 0}`,
    icon: 'mdi-percent-outline',
    iconColor: '#fa9100',
    tooltip: tooltips.conversion,
  },
  {
    title: dashboardStore.crimePrevention?.label,
    value: dashboardStore.crimePrevention?.value || 0,
    icon: 'mdi-shield-check-outline',
    iconColor: '#fa9100',
    tooltip: tooltips.crimePrevention,
  },
  {
    title: dashboardStore.activationTime?.label,
    value: `${dashboardStore.activationTime?.value || 0} min`,
    icon: 'mdi-timer-outline',
    iconColor: '#fa9100',
    tooltip: tooltips.activationTime,
  },
  {
    title: dashboardStore.powerDuration?.label,
    value: `${dashboardStore.powerDuration?.value || 0} heures`,
    icon: 'mdi-clock-outline',
    iconColor: '#fa9100',
    tooltip: tooltips.powerDuration,
  },
  {
    title: 'Avis clients',
    value: `${averageReviewValues.value} / 5`,
    subtitle: `Nombre d'avis : ${totalReviewCount.value}`,
    icon: 'mdi-star-outline',
    iconColor: '#fa9100',
    tooltip: tooltips.review,
  },
  {
    title: dashboardStore.sideEffectRate?.label,
    value: `${dashboardStore.sideEffectRate?.value || 0} %`,
    icon: 'mdi-alert-outline',
    iconColor: '#fa9100',
    tooltip: tooltips.sideEffects,
  },
]);

// Données pour les graphiques
const charts = computed(() => [
  {
    title: 'Ventes de pilules par jour',
    labels: dashboardStore.salesPerDay.map((entry: SalesPerDay) => entry.date),
    values: dashboardStore.salesPerDay.map((entry: SalesPerDay) => entry.value),
    chartType: 'bar' as const,
  },
  {
  title: 'Répartition des pouvoirs vendus',
    labels: dashboardStore.powersSold.map((power: PowerStat) => power.power),
    values: dashboardStore.powersSold.map((power: PowerStat) => power.value),
    chartType: 'pie' as const,
  },
  {
    title: 'Durée moyenne des pouvoirs par type (en heures)',
    labels: dashboardStore.powerDurationByType.map((item: PowerStat) => item.power),
    values: dashboardStore.powerDurationByType.map((item: PowerStat) => item.value),
    chartType: 'bar' as const,
  },
  {
    title: "Nombre d'avis laissés",
    labels: dashboardStore.customerReviews.map((review: CustomerReview) => review.rating.toString()),
    values: dashboardStore.customerReviews.map((review: CustomerReview) => review.value),
    chartType: 'bar' as const,
  },
]);

// Calcul du nombre total d'avis
const totalReviewCount = computed(() =>
  dashboardStore.customerReviews.reduce((sum, review) => sum + review.value, 0),
);

// Calcul de la moyenne des avis
const averageReviewValues = computed(() => {
  let totalReviews = 0;
  let totalWeight = 0;
  dashboardStore.customerReviews.forEach((review, index) => {
    totalReviews += review.value * (index + 1); // index + 1 correspond à la note de l'avis (1 à 5)
    totalWeight += review.value;
  });
  return totalWeight > 0 ? parseFloat((totalReviews / totalWeight).toFixed(2)) : 0;
});

// Définition des tooltips
const tooltips: Record<string, string> = {
  conversion: 'Ce taux correspond au pourcentage de visiteurs ayant acheté une pilule.',
  crimePrevention: 'Nombre de crimes évités grâce aux super-héros créés.',
  activationTime: "Temps moyen avant que les pouvoirs ne s'activent.",
  powerDuration: 'Durée moyenne pendant laquelle les pouvoirs restent actifs.',
  review: 'Les avis des clients sont notés de 1 à 5 étoiles.',
  sideEffects: 'Pourcentage de clients ayant signalé des effets secondaires.',
};
</script>

<style scoped lang="scss">
// TODO déplacer le style dans dans dashboard.scss
.v-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
}
.v-btn {
  width: 100%;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
