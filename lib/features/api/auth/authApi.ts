import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, updateToken } from "./authSlice"
import type { RefreshTokenResponse } from "@/types/auth"

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.data,
              token: data.token,
            })
          );
        } catch (error) {
          // Error handled in the hook
        }
      },
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, string>({
      query: (refreshToken) => ({
        url: "/api/auth/refresh/",
        method: "POST",
        body: { refresh_token: refreshToken },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.access || data.access_token || "";
          const refreshToken = data.refresh || data.refresh_token;

          dispatch(
            updateToken({
              token,
              refreshToken,
            })
          );
        } catch {
          // Error handled in the hook
        }
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          if (typeof window !== "undefined") {
            localStorage.clear();
          }
          return { data: undefined };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error instanceof Error ? error.message : "Logout failed",
            },
          };
        }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi
