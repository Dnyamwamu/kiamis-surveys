export interface VaccinationStatTotals {
  total_cattle: number;
  total_farmers: number;
  total_shots: number;
}

export interface CountyVaccinationTotals {
  county: string;
  farmers: number;
  cattle: number;
  shoats: number;
}

export interface VaccinationStatsResponse {
  totals: VaccinationStatTotals;
  totals_per_county: CountyVaccinationTotals[];
}

export interface DailyVaccinationStat {
  entry_date: string;
  farmers: number;
  vaccinated: number;
}

export type DailyVaccinationStatsResponse = DailyVaccinationStat[];

export interface CountyCumulativeEntity {
  county: string;
  count: number;
}

export interface CountyCumulativeResponse {
  entity: CountyCumulativeEntity[];
}

export interface BreedCountEntity {
  breedName: string;
  totalCount: number;
}

export interface BreedCountResponse {
  entity: BreedCountEntity[];
}

export interface AHAStat {
  id: number;
  name: string;
  mobile_number: string;
  county: string;
  subcounty: string;
  ward: string;
  project: string;
}

export interface AHAStatsResponse {
  total_records: number;
  results: AHAStat[];
  error?: string;
}

export interface LivestockFinancials {
  vaccination_cost?: number;
  farmer_payment?: number;
  subsidised_amount?: number;
  vaccinated_animals_count?: number;
}

export type CountyTotal = {
  county: string;
  farmer_count: number;
  vaccinated_animals_count: number;
  number_of_onboarded_animals: number;
  total_vaccination_cost: number | null;
  total_farmer_payment: number | null;
  total_subsidised_amount: number | null;
  livestock?: {
    cattle?: LivestockFinancials;
    shoats?: LivestockFinancials;
  };
}

export type CountyTotals = CountyTotal;
export type CountyTotalsResponse = CountyTotal[];

export interface KIAMISComparisonItem {
  project: string;
  county: string;
  kiamis_farmers: number;
  total_farmers: number;
  kiamis_animals: number;
  livestock: {
    cattle: {
      no_of_kiamis_animals: number;
      kiamis_farmers: number;
      vaccinated?: number;
    };
    shoats: {
      no_of_kiamis_animals: number;
      kiamis_farmers: number;
      vaccinated?: number;
    };
  };
}

export type KIAMISComparison = KIAMISComparisonItem;
export type KIAMISComparisonResponse = KIAMISComparisonItem[];

export interface CountyItem {
  name: string;
  project: string;
}

export type CountiesResponse = CountyItem[];
