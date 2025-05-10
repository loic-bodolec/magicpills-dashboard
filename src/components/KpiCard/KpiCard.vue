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
/* style dans kpiCard.scss */
</style>
