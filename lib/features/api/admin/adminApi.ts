import { apiSlice } from "../apiSlice";
import type { AdminUnitsResponse } from "@/types/admin";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUnits: builder.query<AdminUnitsResponse, void>({
      query: () => ({
        url: "/vaccination_api/admin_units/",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminUnitsQuery } = adminApi;
