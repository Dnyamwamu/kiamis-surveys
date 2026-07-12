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
  registration_status: RegistrationStatus[];
  household_size_ranges: HouseholdSizeRange[];
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

export interface MaizeSurveyInputsResponse {
  seed_sources: InputSeedSourceRecord[];
  seed_varieties: InputSeedVarietyRecord[];
  planting_dates: InputPlantingDateRecord[];
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

export interface MaizeSurveyHealthResponse {
  pest_presence: HealthPestPresenceRecord[];
  nutrient_deficiency: HealthNutrientDeficiencyRecord[];
  disease_symptoms: HealthDiseaseSymptomRecord[];
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

export interface MaizeSurveyYieldUseResponse {
  historical_yields: YieldUseHistoricalYieldRecord[];
  maize_use: YieldUseMaizeUseRecord[];
  harvesting_months: YieldUseHarvestingMonthRecord[];
  poor_performance_causes: YieldUsePoorPerformanceCauseRecord[];
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
} = surveysApi
