import { defineStore } from 'pinia';
import { fetchMockDashboardData } from '@/services/mockApi';
import type { DashboardData } from '@/types/dashboard';
import { getErrorMessage } from '@/utils/errorUtils';
import { format } from 'date-fns'; // Utilisation de date-fns pour un formatage cohérent

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardData & { isLoading: boolean; isError: boolean; errorMessage: string } => ({
    isLoading: false,
    isError: false,
    errorMessage: '',
    crimePrevention: { label: '', value: 0 },
    activationTime: { label: '', value: 0 },
    conversionRate: { label: '', value: 0 },
    powerDuration: { label: '', value: 0 },
    sideEffectRate: { label: '', value: 0 },
    salesPerDay: [],
    powersSold: [],
    customerReviews: [],
    salesStats: [],
    powerDurationByType: [],
  }),
  getters: {
    /**
     * Calcule le taux de conversion basé sur les visiteurs et les héros créés.
     * @returns Le taux de conversion en pourcentage.
     */
    calculatedConversionRate(state): number {
      const visitors = state.salesStats.find((stat) => stat.label === 'Visiteurs')?.value || 0;
      const heroes =
        state.salesStats.find((stat) => stat.label === 'Clients devenus super-héros')?.value || 0;
      return visitors > 0 ? Math.round((heroes / visitors) * 100) : 0;
    },
  },
  actions: {
    async fetchDashboardData(startDate: Date | null = null, endDate: Date | null = null) {
      this.isLoading = true;
      this.isError = false;
      this.errorMessage = '';

      try {
        // Formatage des dates en YYYY-MM-DD
        const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : null;
        const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null;

        // Appel de l'API mockée avec les dates formatées
        const data: DashboardData = await fetchMockDashboardData(
          formattedStartDate ? new Date(formattedStartDate) : null,
          formattedEndDate ? new Date(formattedEndDate) : null,
        );

        this.crimePrevention = data.crimePrevention ?? { label: '', value: 0 };
        this.activationTime = data.activationTime ?? { label: '', value: 0 };
        this.conversionRate = data.conversionRate ?? { label: '', value: 0 };
        this.powerDuration = data.powerDuration ?? { label: '', value: 0 };
        this.sideEffectRate = data.sideEffectRate ?? { label: '', value: 0 };
        this.salesPerDay = data.salesPerDay ?? [];
        this.powersSold = data.powersSold ?? [];
        this.customerReviews = data.customerReviews ?? [];
        this.salesStats = data.salesStats ?? [];
        this.powerDurationByType = data.powerDurationByType ?? [];
      } catch (error) {
        this.isError = true;
        this.errorMessage = getErrorMessage(error);
        console.error('Erreur lors de la récupération des données du dashboard:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export type DashboardStore = ReturnType<typeof useDashboardStore>;
