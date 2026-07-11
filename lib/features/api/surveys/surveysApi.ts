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
  }),
})

export const {
  useGetCountySurveyStatsQuery,
  useLazyGetCountySurveyStatsQuery,
} = surveysApi
