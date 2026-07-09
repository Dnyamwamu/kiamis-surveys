"use client";

import { useMemo } from "react";
import { useGetAdminUnitsQuery } from "@/lib/features/api/admin/adminApi";
import type { AdministrativeUnits } from "@/types/admin";

/**
 * Hook to extract and organize administrative units from hierarchical API
 */
export function useAdministrativeUnits() {
  const { data: adminUnitsData, isLoading } = useGetAdminUnitsQuery();

  const administrativeUnits = useMemo<AdministrativeUnits>(() => {
    if (!adminUnitsData) {
      return {
        counties: [],
        subCounties: {},
        wards: {},
      };
    }

    const counties = [...adminUnitsData.map((unit) => unit.county)].sort();
    const subCounties: Record<string, string[]> = {};
    const wards: Record<string, string[]> = {};

    adminUnitsData.forEach((unit) => {
      const { county, subcounties } = unit;

      // Extract subcounties for this county (create mutable copy before sorting)
      subCounties[county] = [...subcounties.map((sc) => sc.subcounty)].sort();

      // Extract wards for each subcounty (create mutable copy before sorting)
      subcounties.forEach((subcounty) => {
        const subCountyKey = `${county}:${subcounty.subcounty}`;
        wards[subCountyKey] = [...subcounty.wards].sort();
      });
    });

    return { counties, subCounties, wards };
  }, [adminUnitsData]);

  return {
    administrativeUnits,
    isLoading,
    error: null,
  };
}
