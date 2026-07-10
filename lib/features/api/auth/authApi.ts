import { apiSlice } from "../apiSlice";
import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from "@/types/auth";
import { setCredentials, updateToken } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/api/login_dashboard/",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
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
            }),
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
  overrideExisting: false,
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
  authApi;
