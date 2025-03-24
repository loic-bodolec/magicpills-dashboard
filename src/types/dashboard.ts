export interface PowerStat {
  power: string;
  value: number;
}

export interface CustomerReview {
  rating: string;
  value: number;
}

export interface SalesPerDay {
  date: string;
  value: number;
}

export interface LabeledStat {
  label: string;
  value: number;
}

export interface DashboardData {
  salesPerDay: SalesPerDay[];
  powersSold: PowerStat[];
  customerReviews: CustomerReview[];
  salesStats: LabeledStat[];
  crimePrevention: LabeledStat;
  activationTime: LabeledStat;
  conversionRate: LabeledStat;
  powerDuration: LabeledStat;
  sideEffectRate: LabeledStat;
  powerDurationByType: PowerStat[];
}
