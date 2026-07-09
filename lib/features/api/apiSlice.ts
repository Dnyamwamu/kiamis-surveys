import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthorizationHeaderValue = (token: string): string => {
  const trimmedToken = token.trim();

  // Keep explicit scheme if already present.
  if (/^(Bearer|Token)\s+/i.test(trimmedToken)) {
    return trimmedToken;
  }

  // JWTs are usually bearer tokens; opaque tokens commonly use DRF Token auth.
  const jwtSegments = trimmedToken.split(".");
  return jwtSegments.length === 3
    ? `Bearer ${trimmedToken}`
    : `Token ${trimmedToken}`;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://aharecruitment.kalro.org",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth?: { token?: string } }).auth?.token;
      if (token) {
        headers.set("authorization", getAuthorizationHeaderValue(token));
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Dashboard",
    "Farmers",
    "Distribution",
    "VaccinationStats",
    "CountyFarmers",
    "CountyAnimals",
    "Breeds",
    "AHA",
    "AdminUnits",
    "CountyTotals",
    "KIAMISComparison",
  ],
  endpoints: () => ({}),
});
