import type { DashboardData } from '@/types/dashboard';

export const mockData: DashboardData = {
  salesPerDay: [
    { day: 'Lun', value: 15 },
    { day: 'Mar', value: 22 },
    { day: 'Mer', value: 18 },
    { day: 'Jeu', value: 30 },
    { day: 'Ven', value: 25 },
    { day: 'Sam', value: 40 },
    { day: 'Dim', value: 35 },
  ],
  powersSold: [
    { power: 'Force surhumaine', value: 45 },
    { power: 'Vol', value: 30 },
    { power: 'Vision laser', value: 20 },
    { power: 'Invisibilité', value: 15 },
    { power: 'Autres', value: 10 },
  ],
  customerReviews: [
    { rating: '1 étoile', value: 5 },
    { rating: '2 étoiles', value: 10 },
    { rating: '3 étoiles', value: 20 },
    { rating: '4 étoiles', value: 35 },
    { rating: '5 étoiles', value: 60 },
  ],
  salesStats: [
    { label: 'Pilules vendues', value: 1200 },
    { label: 'Clients devenus super-héros', value: 950 },
  ],
  crimePrevention: { label: 'Crimes évités', value: 320 },
  activationTime: { label: 'Temps moyen avant effet', value: 5 }, // en minutes
  conversionRate: { label: 'Taux de conversion', value: 85 }, // % de clients ayant acheté après visite
  powerDuration: { label: 'Durée moyenne des pouvoirs', value: 12 }, // en heures
  customerSatisfaction: { label: 'Taux de satisfaction client', value: 92 },
  sideEffectRate: { label: 'Effets secondaires signalés', value: 3 }, // en %
  powerDurationByType: [
    { power: 'Force surhumaine', value: 24 }, // durée en heures
    { power: 'Vol', value: 12 },
    { power: 'Vision laser', value: 8 },
    { power: 'Invisibilité', value: 6 },
    { power: 'Autres', value: 10 },
  ],
};
