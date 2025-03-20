<template>
  <v-card class="kpi-chart-card">
    <v-card-text class="kpi-chart-container">
      <div class="kpi-chart-scrollable">
      <v-chart
        ref="chartRef"
        class="kpi-chart"
        :option="chartOptions"
        autoresize
        aria-label="Graphique représentant {{ props.title }}"
        role="img"
        aria-live="polite"
      />
    </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { VCard, VCardText } from 'vuetify/components';
import type { EChartsOption, SeriesOption } from 'echarts';

// Chargement des modules ECharts nécessaires
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);

interface ChartProps {
  title: string;
  labels: string[];
  values: number[];
  chartType?: 'bar' | 'line' | 'pie' | 'radar';
  showLegend?: boolean;
  barColors?: string[];
}

const props = defineProps<ChartProps>();
const chartRef = ref<InstanceType<typeof VChart> | null>(null);

const DEFAULT_COLOR = '#fa9100'; // Couleur orange par défaut
const COLORS = ['#2d3282', '#fa9100', '#4CAF50', '#FF5722', '#9C27B0', '#00BCD4'];

// Forcer un resize après le rendu
onMounted((): void => {
  nextTick((): void => {
    chartRef.value?.resize();
  });
});

// Surveille les changements de props pour mettre à jour le graphique
watch(
  () => [props.labels, props.values, props.chartType, props.barColors],
  (): void => {
    nextTick((): void => {
      chartRef.value?.resize();
    });
  },
);

// Fonction pour générer les données en fonction du type de graphique
function getData(): SeriesOption['data'] {
  if (props.chartType === 'pie') {
    return props.labels.map((label, index) => ({
      name: label,
      value: props.values[index],
      itemStyle: {
        color: props.barColors?.[index % props.barColors.length] || COLORS[index % COLORS.length],
      },
    }));
  } else {
    return props.values;
  }
}

// Fonction pour générer les options du graphique
function getChartOptions(): EChartsOption {
  const containerWidth = chartRef.value?.$el.offsetWidth || 0;
  const fontSize = containerWidth < 400 ? 14 : containerWidth < 600 ? 18 : 20; // Ajuste la taille du texte

  return {
    title: {
      text: props.title,
      left: 'left',
      textStyle: { fontSize: 16, color: '#2d3282', fontWeight: 'bold' },
    },
    tooltip: { trigger: 'item' },
    legend: props.showLegend
      ? { textStyle: { color: '#2d3282' }, orient: 'horizontal', bottom: '0', left: 'center' }
      : undefined,
    grid: { left: '5%', right: '5%', bottom: '15%' },
    xAxis:
      props.chartType !== 'pie' && props.chartType !== 'radar'
        ? {
            type: 'category',
            data: props.labels,
            axisLabel: { color: '#333' },
            axisLine: { lineStyle: { color: '#333' } },
          }
        : undefined,
    yAxis:
      props.chartType !== 'pie' && props.chartType !== 'radar'
        ? {
            type: 'value',
            axisLabel: { color: '#333' },
            axisLine: { lineStyle: { color: '#333' } },
          }
        : undefined,
    radar:
      props.chartType === 'radar'
        ? {
            indicator: props.labels.map((label) => ({
              name: label,
              max: Math.max(...props.values) + 10,
            })),
            axisName: { color: '#333' },
          }
        : undefined,
    series: [
      {
        name: props.title,
        type: props.chartType,
        data: getData(),
        itemStyle: {
          color:
            props.chartType === 'bar'
              ? ({ dataIndex }: { dataIndex: number }) =>
                  props.barColors?.[dataIndex % props.barColors.length] || DEFAULT_COLOR
              : undefined,
          barBorderRadius: props.chartType === 'bar' ? [5, 5, 0, 0] : undefined,
        },
        smooth: props.chartType === 'line',
        areaStyle: props.chartType === 'line' ? { opacity: 0.3 } : undefined,
      } as SeriesOption,
    ],
  };
}

const chartOptions = ref<EChartsOption>(getChartOptions());
</script>

<style scoped lang="scss">
/* style dans kpiChart.scss */
</style>
