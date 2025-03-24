import { format, addDays, differenceInCalendarDays } from 'date-fns';
import type { DashboardData } from '@/types/dashboard';

/**
 * Génère des données de ventes journalières pour une période définie.
 * @param startDateStr - Date de début au format YYYY-MM-DD.
 * @param endDateStr - Date de fin au format YYYY-MM-DD.
 * Génère des données de ventes journalières pour une période définie.
 * @param startDateStr - Date de début au format YYYY-MM-DD.
 * @param endDateStr - Date de fin au format YYYY-MM-DD.
 * @returns Un tableau de ventes par jour avec une date et une valeur aléatoire.
 */
const generateSalesData = (
  startDateStr: string,
  endDateStr: string,
): { date: string; value: number }[] => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
const generateSalesData = (
  startDateStr: string,
  endDateStr: string,
): { date: string; value: number }[] => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const salesData = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    salesData.push({
      date: format(currentDate, 'yyyy-MM-dd'), // Format YYYY-MM-DD
      value: Math.floor(Math.random() * 100) + 10, // Valeurs entre 10 et 110
    });

    currentDate = addDays(currentDate, 1); // Passe au jour suivant
  }

  return salesData;
};

/**
 * Génère des données dynamiques pour les pouvoirs vendus.
 * Le nombre de pouvoirs vendus est proportionnel à la durée de la période.
 * @param days - Nombre de jours dans la période.
 * @returns Un tableau de pouvoirs avec des valeurs aléatoires.
 */
const generatePowersSold = (days: number): { power: string; value: number }[] => {
  const powers = ['Force surhumaine', 'Vol', 'Vision laser', 'Invisibilité', 'Autres'];
  return powers.map((power) => ({
    power,
    value: Math.floor(Math.random() * 10 * days) + 10, // Valeurs proportionnelles à la période
  }));
};

/**
 * Génère des avis clients dynamiques.
 * Le nombre d'avis est proportionnel à la durée de la période.
 * @param days - Nombre de jours dans la période.
 * @returns Un tableau d'avis clients avec des valeurs aléatoires.
 */
const generateCustomerReviews = (days: number): { rating: string; value: number }[] => {
  const ratings = ['1 étoile', '2 étoiles', '3 étoiles', '4 étoiles', '5 étoiles'];
  return ratings.map((rating) => ({
    rating,
    value: Math.floor(Math.random() * days) + 5, // Valeurs proportionnelles à la période
  }));
};

/**
 * Génère des statistiques dynamiques.
 * Les statistiques sont ajustées en fonction de la durée de la période.
 * @param days - Nombre de jours dans la période.
 * @returns Un tableau de statistiques avec des valeurs aléatoires.
 */
const generateSalesStats = (days: number): { label: string; value: number }[] => {
  const visitors = Math.floor(Math.random() * 50 * days) + 500; // Nombre de visiteurs proportionnel à la période
  const heroes = Math.floor(Math.random() * visitors * 0.6); // Nombre de héros créés (max 60% des visiteurs)

  return [
    { label: 'Visiteurs', value: visitors },
    { label: 'Clients devenus super-héros', value: heroes },
  ];
};

/**
 * Génère des données dynamiques pour la durée des pouvoirs par type.
 * @returns Un tableau de durées par type de pouvoir.
 */
const generatePowerDurationByType = (): { power: string; value: number }[] => {
  const powers = ['Force surhumaine', 'Vol', 'Vision laser', 'Invisibilité', 'Autres'];
  return powers.map((power) => ({
    power,
    value: Math.floor(Math.random() * 20) + 5, // Durée entre 5 et 25 heures
  }));
};

/**
 * Calcule le nombre de jours entre deux dates.
 * @param startDate - Date de début.
 * @param endDate - Date de fin.
 * @returns Nombre de jours entre les deux dates.
 */
const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return differenceInCalendarDays(end, start) + 1; // Inclut les deux dates
};

/**
 * Génère toutes les données dynamiques pour une période définie.
 * @param startDate - Date de début au format YYYY-MM-DD.
 * @param endDate - Date de fin au format YYYY-MM-DD.
 * @returns Les données dynamiques pour le tableau de bord.
 */
export const generateMockData = (startDate: string, endDate: string): DashboardData => {
  const days = calculateDaysBetween(startDate, endDate);

  // Générer les statistiques des visiteurs et des héros
  const salesStats = generateSalesStats(days);

  return {
    salesPerDay: generateSalesData(startDate, endDate),
    powersSold: generatePowersSold(days),
    customerReviews: generateCustomerReviews(days),
    salesStats: salesStats,
    crimePrevention: { label: 'Crimes évités', value: Math.floor(Math.random() * 5 * days) + 100 }, // Proportionnel à la période
    activationTime: { label: 'Temps moyen avant effet', value: Math.floor(Math.random() * 10) + 1 }, // Entre 1 et 10 minutes
    conversionRate: { label: 'Taux de conversion', value: 0 }, // Placeholder, calculé ailleurs
    powerDuration: {
      label: 'Durée moyenne des pouvoirs',
      value: Math.floor(Math.random() * 20) + 5,
    }, // Entre 5 et 25 heures
    sideEffectRate: { label: 'Effets secondaires signalés', value: Math.floor(Math.random() * 10) }, // Entre 0% et 10%
    powerDurationByType: generatePowerDurationByType(),
  };
};
