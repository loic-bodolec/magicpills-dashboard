import { mockData } from '@/services/mockData';
import type { DashboardData } from '@/types/dashboard';

/**
 * Filtre les données en fonction d'une plage de dates donnée.
 * @param startDate Date de début (objet Date ou null).
 * @param endDate Date de fin (objet Date ou null).
 * @returns Données filtrées du tableau de bord.
 */
export const fetchMockDashboardData = async (
  startDate?: Date | null,
  endDate?: Date | null,
): Promise<DashboardData> => {
  // Si aucune période sélectionnée, on retourne toutes les données
  if (!startDate && !endDate) {
    return mockData;
  }

  // Convertir les dates en format YYYY-MM-DD pour comparaison
  const start = startDate ? startDate.toISOString().split('T')[0] : null;
  const end = endDate ? endDate.toISOString().split('T')[0] : null;

  // Filtrer les ventes par jour
  const filteredSalesPerDay = mockData.salesPerDay.filter((entry) => {
    const entryDate = entry.date;
    return (!start || entryDate >= start) && (!end || entryDate <= end);
  });

  return {
    ...mockData,
    salesPerDay: filteredSalesPerDay,
  };
};
