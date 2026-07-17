import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "@/lib/store"

// Surveys
export interface CountySurveySummary {
  county: string
  total_surveys: number
  registered_farmers: number
  unregistered_farmers: number
  fall_armyworm_cases: number
  avg_yield_per_acre: number
  nitrogen_deficiency_cases: number
  phosphorus_deficiency_cases: number
}

export interface MaizeUtilization {
  family_consumption: number
  commercial_sale: number
  animal_feeds: number
}

export interface CountySurveySummaryResponse {
  results: CountySurveySummary[]
}

export interface MaizeSurveyCountyStats {
  visited_farmers: number;
  target: number;
  visited_percent: number;
  counties_covered: number;
  avg_household_size: number;
  average_acreage: number;
  average_acreage_total: number;
  total_maize_acreage: number;
  total_land_acreage: number;
  expected_yield_bags_per_acre: number;
  avg_daily_submissions_per_agripreneur: number;
  sunflower_interest_count: number;
  sunflower_interest_percent: number;
  already_registered_visited: number;
  new_farmers_visited: number;
  surveys_approved: number;
  surveys_pending: number;
  surveys_rejected: number;
  male_farmers_count: number;
  female_farmers_count: number;
  other_farmers_count: number;
  average_maize_stored: number;
  maize_utilization?: MaizeUtilization;
}

export interface MaizeSurveyCountyStatsQueryParams {
  county?: string;
  project?: string;
  subcounty?: string;
  ward?: string;
}

export interface GenderDistribution {
  name: string;
  value: number;
  percentage: number;
}

export interface RegistrationStatus {
  name: string;
  value: number;
  percentage: number;
}

export interface HouseholdSizeRange {
  range: string;
  value: number;
}

export interface MaizeSurveyDemographics {
  gender_distribution: GenderDistribution[];
  age_distribution?: AgeDistribution[];
  registration_status: RegistrationStatus[];
  household_size_ranges: HouseholdSizeRange[];
  storage_distribution?: StorageDistribution[];
  storage_summary?: StorageSummary;
}

export interface AgeDistribution {
  range: string;
  value: number;
  percentage?: number;
}


export interface StorageDistribution {
  range: string;
  value: number;
  percentage?: number;
}

export interface StorageSummary {
  total_bags: number;
  average_bags: number;
  with_storage_percentage: number;
}


export interface DailyProgressRecord {
  day: string;
  visited: number;
}

export interface GrowthStageRecord {
  stage: string;
  count: number;
}

export interface CropUniformityRecord {
  name: string;
  value: number;
  percentage: number;
}

export interface PlantColorRecord {
  name: string;
  value: number;
}

export interface IrrigationRecord {
  name: string;
  value: number;
  percentage: number;
}

export interface MaizeSurveyGrowth {
  growth_stages: GrowthStageRecord[];
  crop_uniformity: CropUniformityRecord[];
  plant_color: PlantColorRecord[];
  irrigation: IrrigationRecord[];
}

export interface MaizeSurveyGrowthDetailedRecord {
  stage: string;
  acreage: string;
  uniformity: string;
  color: string;
  irrigation: string;
}

export interface InputSeedSourceRecord {
  name: string;
  value: number;
  percentage: number;
}

export interface InputSeedVarietyRecord {
  name: string;
  value: number;
  percentage: number;
}

export interface InputPlantingDateRecord {
  period: string;
  fields: number;
}

export interface FertilizerUseRecord {
  name: string;
  value: number;
  percentage: number;
}

export interface FertilizerApplicationRecord {
  name: string;
  value: number;
  percentage: number;
}

export interface MaizeSurveyInputsResponse {
  seed_sources: InputSeedSourceRecord[];
  seed_varieties: InputSeedVarietyRecord[];
  planting_dates: InputPlantingDateRecord[];
  fertilizer_use?: FertilizerUseRecord[];
  fertilizer_application?: FertilizerApplicationRecord[];
}

export interface HealthPestPresenceRecord {
  name: string;
  present: number;
  absent: number;
}

export interface HealthNutrientDeficiencyRecord {
  deficiency: string;
  present: number;
  absent: number;
}

export interface HealthDiseaseSymptomRecord {
  name: string;
  percentage: number;
}

export interface MajorPestRecord {
  pest: string;
  incidence: number;
  severity: "Low" | "Moderate" | "High";
}

export interface WeedLevelRecord {
  name: string;
  percentage: number;
}

export interface MaizeSurveyHealthResponse {
  pest_presence: HealthPestPresenceRecord[];
  nutrient_deficiency: HealthNutrientDeficiencyRecord[];
  disease_symptoms: HealthDiseaseSymptomRecord[];
  major_pests?: MajorPestRecord[];
  average_faw_damage?: number;
  weed_levels?: WeedLevelRecord[];
  dominant_weeds?: string[];
}

export interface YieldUseHistoricalYieldRecord {
  year: string;
  yield: number;
}

export interface YieldUseMaizeUseRecord {
  name: string;
  value: number;
}

export interface YieldUseHarvestingMonthRecord {
  month: string;
  fields: number;
}

export interface YieldUsePoorPerformanceCauseRecord {
  cause: string;
  percentage: number;
}

export interface CopingStrategyRecord {
  intervention: string;
  percentage: number;
}

export interface PerformanceRatingRecord {
  indicator: string;
  rating: "Excellent" | "Good" | "Fair" | "Poor" | "Above Average" | "Average" | "Below Average";
}

export interface ProductionConstraintRecord {
  constraint: string;
  percentage: number;
  severity: "High" | "Medium" | "Low";
}

export interface MaizeSurveyYieldUseResponse {
  historical_yields: YieldUseHistoricalYieldRecord[];
  maize_use: YieldUseMaizeUseRecord[];
  harvesting_months: YieldUseHarvestingMonthRecord[];
  poor_performance_causes: YieldUsePoorPerformanceCauseRecord[];
  production_constraints?: ProductionConstraintRecord[];
  coping_strategies?: CopingStrategyRecord[];
  performance_ratings?: PerformanceRatingRecord[];
}

export interface CountyPerformanceRecord {
  county: string;
  project: string;
  visited: number;
  target: number | null;
  acreage: number;
}

export interface MaizeSurveyCountyPerformanceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CountyPerformanceRecord[];
}

export interface AgripreneurStat {
  id_number: string;
  phone_number: string;
  agripreneur_name: string;
  county: string;
  subcounty: string;
  ward: string;
  total_submitted: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface MaizeSurveyApStatsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AgripreneurStat[];
}

export interface MaizeSurveyApStatsQueryParams {
  page?: number;
  page_size?: number;
  county?: string;
  project?: string;
  subcounty?: string;
  ward?: string;
}

export const surveysApi = createApi({
  reducerPath: "surveysApi",
  baseQuery: fetchBaseQuery({
    baseUrl: (() => {
      const url = process.env.NEXT_PUBLIC_KIAMIS_API_URL || ""
      if (!url) return "/api/"
      return url.endsWith("/") ? url : `${url}/`
    })(),
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token || "9cf819bee213c2e2c4142d309539fb4fe840a361"
      if (token) {
        headers.set("Authorization", `Token ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["CountySurveyStats"],
  endpoints: (builder) => ({
    getCountySurveyStats: builder.query<
      CountySurveySummaryResponse,
      {
        page?: number
        page_size?: number
        county?: string
        sub_county?: string
        ward?: string
      }
    >({
      query: ({ page = 1, page_size = 100, county, sub_county, ward } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          page_size: page_size.toString(),
        })
        if (county) params.append("county", county)

        const subCountyVal = sub_county
        if (subCountyVal) {
          params.append("sub_county", subCountyVal)
        }

        if (ward) params.append("ward", ward)

        return {
          url: `kyf/maize_survey/stats/?${params.toString()}`,
          method: "GET",
        }
      },
      providesTags: ["CountySurveyStats"],
    }),

    getMaizeSurveyCountyStats: builder.query<
      MaizeSurveyCountyStats,
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/county_stats/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyDemographics: builder.query<
      MaizeSurveyDemographics,
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/demographics/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyDailyProgress: builder.query<
      DailyProgressRecord[],
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/daily_progress/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyGrowth: builder.query<
      MaizeSurveyGrowth,
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/growth/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyGrowthDetailed: builder.query<
      MaizeSurveyGrowthDetailedRecord[],
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/growth_detailed/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyInputs: builder.query<
      MaizeSurveyInputsResponse,
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/inputs/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyHealth: builder.query<
      MaizeSurveyHealthResponse,
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/health/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyYieldUse: builder.query<
      MaizeSurveyYieldUseResponse,
      MaizeSurveyCountyStatsQueryParams
    >({
      query: ({ county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams();
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/yield_use/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyCountyPerformance: builder.query<
      MaizeSurveyCountyPerformanceResponse,
      {
        page?: number;
        page_size?: number;
        county?: string;
        project?: string;
        subcounty?: string;
        ward?: string;
      }
    >({
      query: ({ page = 1, page_size = 100, county, project, subcounty, ward } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          page_size: page_size.toString(),
        });
        if (county) params.append("county", county);
        if (project) params.append("project", project);
        if (subcounty) params.append("subcounty", subcounty);
        if (ward) params.append("ward", ward);

        return {
          url: `kyf/maize_survey/county_performance/?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getMaizeSurveyApStats: builder.query<
      MaizeSurveyApStatsResponse,
      MaizeSurveyApStatsQueryParams
    >({
      query: ({ page = 1, page_size = 100, county, project, subcounty, ward } = {}) => {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          page_size: page_size.toString(),
        });
        if (county) queryParams.append("county", county);
        if (project) queryParams.append("project", project);
        if (subcounty) queryParams.append("subcounty", subcounty);
        if (ward) queryParams.append("ward", ward);

        return {
          url: `kyf/maize_survey/ap_stats/?${queryParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
})

export const {
  useGetCountySurveyStatsQuery,
  useLazyGetCountySurveyStatsQuery,
  useGetMaizeSurveyCountyStatsQuery,
  useLazyGetMaizeSurveyCountyStatsQuery,
  useGetMaizeSurveyDemographicsQuery,
  useLazyGetMaizeSurveyDemographicsQuery,
  useGetMaizeSurveyDailyProgressQuery,
  useLazyGetMaizeSurveyDailyProgressQuery,
  useGetMaizeSurveyGrowthQuery,
  useLazyGetMaizeSurveyGrowthQuery,
  useGetMaizeSurveyGrowthDetailedQuery,
  useLazyGetMaizeSurveyGrowthDetailedQuery,
  useGetMaizeSurveyInputsQuery,
  useLazyGetMaizeSurveyInputsQuery,
  useGetMaizeSurveyHealthQuery,
  useLazyGetMaizeSurveyHealthQuery,
  useGetMaizeSurveyYieldUseQuery,
  useLazyGetMaizeSurveyYieldUseQuery,
  useGetMaizeSurveyCountyPerformanceQuery,
  useLazyGetMaizeSurveyCountyPerformanceQuery,
  useGetMaizeSurveyApStatsQuery,
  useLazyGetMaizeSurveyApStatsQuery,
} = surveysApi
