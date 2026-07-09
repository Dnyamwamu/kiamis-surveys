"use client";

import {
  Users,
  Beef,
  Syringe,
  TicketCheck,
  MapPin,
  PawPrint,
  Stethoscope,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  isNationalUser,
  isSuperAdmin,
  isCountyUser,
} from "@/lib/features/api/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";

interface StatCardsSectionProps {
  totalFarmersFromAPI: number;
  vaccinationStats: {
    totalFarmers: number;
    totalCattle: number;
    totalShoats: number;
  };
  totalAnimalsFromAPI: number;
  totalVets: number;
  // uniqueCountiesCount: number;
  countyCountFromTotals: number;
  countiesOrWardsCount: number;
  countiesOrWardsLabel: string;
  countiesOrWardsDescription: string;
  uniqueBreedsCount: number;
  fpoTotals: {
    totalFarmers: number;
    totalOnboardedAnimals: number;
    totalAnimals: number;
    totalVaccinationCost: number;
    totalFarmerPayment: number;
    totalSubsidy: number;
  };
  kiamisTotals: {
    totalFarmers: number;
    totalCattle: number;
    totalShoats: number;
    cattleFarmers: number;
    shoatsFarmers: number;
  };
  isNational: boolean;
  userCounty?: string;
  userProject?: string;
  isLoadingCountyFarmers: boolean;
  isLoadingVaccinationStats: boolean;
  isLoadingCountyAnimals: boolean;
  isLoadingAHA: boolean;
  isLoadingAdminUnits: boolean;
  isLoadingBreedCount: boolean;
  isLoadingCountyBreedCount: boolean;
  isLoadingFPO: boolean;
  isLoadingKiamis: boolean;
}

export function StatCardsSection({
  totalFarmersFromAPI,
  vaccinationStats,
  totalAnimalsFromAPI,
  totalVets,
  countyCountFromTotals,
  countiesOrWardsCount,
  countiesOrWardsLabel,
  countiesOrWardsDescription,
  uniqueBreedsCount,
  fpoTotals,
  kiamisTotals,
  isNational,
  userCounty,
  userProject,
  isLoadingCountyFarmers,
  isLoadingVaccinationStats,
  isLoadingCountyAnimals,
  isLoadingAHA,
  isLoadingAdminUnits,
  isLoadingBreedCount,
  isLoadingCountyBreedCount,
  isLoadingFPO,
  isLoadingKiamis,
}: StatCardsSectionProps) {
  const isFSRPUser = userProject?.toLowerCase() === "fsrp";
  const isNAVCDPUser = userProject?.toLowerCase() === "navcdp";
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!isFSRPUser && (
          <StatCard
            title="Total Farmers Onboarded "
            value={totalFarmersFromAPI}
            icon={<Users className="h-5 w-5" />}
            description={
              isNational
                ? "Number of Onboarded farmers for Vaccination eligibility across the counties"
                : `Number of Onboarded farmers for Vaccination eligibility in ${userCounty}`
            }
            isLoading={isLoadingCountyFarmers}
          />
        )}
        <StatCard
          title="Vouchers Redeemed"
          value={vaccinationStats.totalFarmers}
          icon={<TicketCheck className="h-5 w-5" />}
          description={
            isNational
              ? "Number of farmers with redeemed vouchers across the counties"
              : `Number of farmers with redeemed vouchers in ${userCounty}`
          }
          isLoading={isLoadingVaccinationStats}
        />
        {!isFSRPUser && (
          <StatCard
            title="Total Cattle Onboarded"
            value={totalAnimalsFromAPI}
            icon={<Beef className="h-5 w-5" />}
            description={
              isNational
                ? "Number of onboarded cattle with Muzzles taken across the counties"
                : `Number of onboarded cattle with Muzzles taken in ${userCounty}`
            }
            isLoading={isLoadingCountyAnimals}
          />
        )}
        <StatCard
          title="Cattle Vaccinated"
          value={vaccinationStats.totalCattle}
          outOf={kiamisTotals.totalCattle}
          outOfLabel="Cattles registered in KIAMIS"
          icon={<Syringe className="h-5 w-5" />}
          description={
            isNational
              ? "Total cattle vaccinated across the counties"
              : `Total cattle vaccinated in ${userCounty}`
          }
          isLoading={isLoadingVaccinationStats}
        />

        <StatCard
          title="Shoats Vaccinated"
          value={vaccinationStats.totalShoats}
          outOf={kiamisTotals.totalShoats}
          outOfLabel="Shoats registered in KIAMIS"
          icon={<Syringe className="h-5 w-5" />}
          description={
            isNational
              ? "Total Goats and Sheep vaccinated across the counties"
              : `Total Goats and Sheep vaccinated in ${userCounty}`
          }
          isLoading={isLoadingVaccinationStats}
        />

        <StatCard
          title="Animal Health Assistants"
          value={totalVets}
          icon={<Stethoscope className="h-5 w-5" />}
          description={
            isNational
              ? "Total Vets onboarded across the counties"
              : `Total Vets onboarded in ${userCounty}`
          }
          isLoading={isLoadingAHA}
        />
        {isNationalUser(user) && (
          <StatCard
            title="Active Counties"
            value={countyCountFromTotals}
            icon={<MapPin className="h-5 w-5" />}
            description={<>{userProject} Counties</>}
            isLoading={isLoadingCountyFarmers}
          />
        )}
        {!isNationalUser(user) && (
          <StatCard
            title={countiesOrWardsLabel}
            value={countiesOrWardsCount}
            icon={<MapPin className="h-5 w-5" />}
            description={countiesOrWardsDescription}
            isLoading={isLoadingAdminUnits}
          />
        )}
        {!isFSRPUser && (
          <StatCard
            title="Breeds"
            value={uniqueBreedsCount}
            icon={<PawPrint className="h-5 w-5" />}
            description={
              isNational
                ? "Different cattle breeds registered"
                : `Different breeds in ${userCounty}`
            }
            isLoading={
              isNational ? isLoadingBreedCount : isLoadingCountyBreedCount
            }
          />
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="KIAMIS Livestock Farmers"
          value={kiamisTotals.totalFarmers}
          icon={<Users className="h-5 w-5" />}
          description={
            <div>
              <div className="text-sm text-muted-foreground">
                {isNational
                  ? "Total farmers with Livestock (Cattle and Shoats) in KIAMIS"
                  : `KIAMIS farmers with Livestock (Cattle and Shoats) in ${userCounty}`}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cattle:</span>
                  <span className="font-medium ">
                    {(kiamisTotals.cattleFarmers ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shoats:</span>
                  <span className="font-medium ">
                    {(kiamisTotals.shoatsFarmers ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          }
          isLoading={isLoadingKiamis}
        />
        <StatCard
          title="KIAMIS Livestock"
          value={kiamisTotals.totalCattle + kiamisTotals.totalShoats}
          icon={<Beef className="h-5 w-5" />}
          description={
            <div>
              <div className="text-sm text-muted-foreground">
                {isNational
                  ? "Total livestock (Cattle and Shoats) in KIAMIS"
                  : `KIAMIS Livestock (Cattle and Shoats) in ${userCounty}`}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cattle:</span>
                  <span className="font-medium ">
                    {(kiamisTotals.totalCattle ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shoats:</span>
                  <span className="font-medium ">
                    {(kiamisTotals.totalShoats ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          }
          isLoading={isLoadingKiamis}
        />
      </div>
    </>
  );
}
