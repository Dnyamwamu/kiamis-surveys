import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface LoginRequest {
  email: string
  password: string
}

export interface UserProfile {
  role: number
  county: string | null
  county_id: number | null
  subcounty_id: number | null
  ward_id: number | null
  subcounty: string | null
  ward: string | null
  id_number: string
  mobile_number: string
  is_active: boolean
  is_staff: boolean
  is_deactivated: boolean
}

export interface UserData {
  email: string
  first_name: string
  last_name: string
  username: string
  profile: UserProfile
}

export interface LoginResponse {
  message: string
  token: string
  data: UserData
}

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_KIAMIS_API_URL!,
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "enum/officials_login/",

        method: "POST",

        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
