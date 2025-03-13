import { defineStore } from 'pinia';
import { fetchMockDashboardData } from '@/services/mockApi';
import type { DashboardData } from '@/types/dashboard';
import { getErrorMessage } from '@/utils/errorUtils';

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardData & { isLoading: boolean; isError: boolean; errorMessage: string } => ({
    isLoading: false,
    isError: false,
    errorMessage: '',
    salesPerDay: [],
    powersSold: [],
    customerReviews: [],
    salesStats: [],
    crimePrevention: [],
    activationTime: [],
    conversionRate: [],
    powerDuration: [],
    customerSatisfaction: [],
    sideEffectRate: [],
    powerDurationByType: [],
  }),
  actions: {
    async fetchDashboardData() {
      this.isLoading = true;
      this.isError = false;
      this.errorMessage = '';

      try {
        const data: DashboardData = await fetchMockDashboardData();

        this.salesPerDay = data.salesPerDay ?? [];
        this.powersSold = data.powersSold ?? [];
        this.customerReviews = data.customerReviews ?? [];
        this.salesStats = data.salesStats ?? [];
        this.crimePrevention = data.crimePrevention ?? [];
        this.activationTime = data.activationTime ?? [];
        this.conversionRate = data.conversionRate ?? [];
        this.powerDuration = data.powerDuration ?? [];
        this.customerSatisfaction = data.customerSatisfaction ?? [];
        this.sideEffectRate = data.sideEffectRate ?? [];
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
