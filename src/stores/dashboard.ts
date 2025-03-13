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
    crimePrevention: { label: '', value: 0 },
    activationTime: { label: '', value: 0 },
    conversionRate: { label: '', value: 0 },
    powerDuration: { label: '', value: 0 },
    customerSatisfaction: { label: '', value: 0 },
    sideEffectRate: { label: '', value: 0 },
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
        this.crimePrevention = data.crimePrevention ?? { label: '', value: 0 };
        this.activationTime = data.activationTime ?? { label: '', value: 0 };
        this.conversionRate = data.conversionRate ?? { label: '', value: 0 };
        this.powerDuration = data.powerDuration ?? { label: '', value: 0 };
        this.customerSatisfaction = data.customerSatisfaction ?? { label: '', value: 0 };
        this.sideEffectRate = data.sideEffectRate ?? { label: '', value: 0 };
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
