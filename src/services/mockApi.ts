import { generateMockData } from '@/services/mockData';
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
  // Définir des dates par défaut si aucune période n'est sélectionnée
  const defaultStartDate = '2025-01-01';
  const defaultEndDate = new Date().toISOString().split('T')[0];

  // Convertir les dates en format YYYY-MM-DD
  const start = startDate ? startDate.toISOString().split('T')[0] : defaultStartDate;
  const end = endDate ? endDate.toISOString().split('T')[0] : defaultEndDate;

  // Générer les données dynamiques pour la période donnée
  const mockData = generateMockData(start, end);

  // Filtrer les ventes par jour (si nécessaire)
  const filteredSalesPerDay = mockData.salesPerDay.filter((entry) => {
    const entryDate = entry.date;
    return (!start || entryDate >= start) && (!end || entryDate <= end);
  });

  return {
    ...mockData,
    salesPerDay: filteredSalesPerDay,
  };
};
