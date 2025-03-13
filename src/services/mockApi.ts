import { mockData } from '@/services/mockData';
// import { simulateApiDelay } from '@/utils/utils';
import type { DashboardData } from '@/types/dashboard';

/**
 * Récupère les données simulées du tableau de bord.
 * @returns Les données simulées du tableau de bord.
 */
export const fetchMockDashboardData = async (): Promise<DashboardData> => {
  // Simulation d'un délai pour l'appel API
  // await simulateApiDelay(1000);
  return mockData;
};
