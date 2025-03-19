<template>
  <v-card class="kpi-card-container">
    <v-card-title class="kpi-card-header">
      <div class="kpi-card-title">
        <v-icon v-if="props.icon" :style="{ color: props.iconColor }" aria-hidden="true">
          {{ props.icon }}
        </v-icon>
        <span class="kpi-title-text">{{ props.title }}</span>
      </div>

      <v-tooltip v-if="props.tooltip" location="bottom" open-on-click>
        <template v-slot:activator="{ props: tooltipProps }">
          <v-icon
            v-bind="tooltipProps"
            class="kpi-card-tooltip-icon"
            aria-describedby="tooltip-text"
            tabindex="0"
            role="button"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <span id="tooltip-text" role="tooltip">{{ props.tooltip }}</span>
      </v-tooltip>
    </v-card-title>
    <v-divider />

    <v-card-subtitle v-if="props.subtitle" class="kpi-card-subtitle">
      {{ props.subtitle }}
    </v-card-subtitle>

    <v-card-text class="kpi-card-text">
      <div class="kpi-card-value" role="status" aria-live="polite">
        {{ props.value }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface KpiCardProps {
  title: string;
  subtitle?: string;
  value: number | string;
  tooltip?: string;
  icon?: string;
  iconColor?: string;
}

const props = defineProps<KpiCardProps>();
</script>

<style scoped lang="scss">
/* TODO style dans kpiCard.scss */
.kpi-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kpi-title-text {
  font-size: clamp(0.75rem, 1.5vw, 1rem); // Ajuste la taille entre 0.75rem et 1rem
  font-weight: bold;
  color: #2d3282;
  // white-space: nowrap;
  overflow: hidden; // Cache le texte qui dépasse
  text-overflow: ellipsis; // Ajoute "..." si le texte est trop long
}
</style>
