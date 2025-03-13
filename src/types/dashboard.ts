export interface DashboardData {
  salesPerDay: { day: string; value: number }[];
  powersSold: { power: string; value: number }[];
  customerReviews: { rating: string; value: number }[];
  salesStats: { label: string; value: number }[];
  crimePrevention: { label: string; value: number }[];
  activationTime: { label: string; value: number }[];
  conversionRate: { label: string; value: number }[];
  powerDuration: { label: string; value: number }[];
  customerSatisfaction: { label: string; value: number }[];
  sideEffectRate: { label: string; value: number }[];
  powerDurationByType: { power: string; value: number }[];
}
