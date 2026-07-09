"use client";

import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertCircle, Maximize2, X } from "lucide-react";
import { Download } from "lucide-react";
import { exportToCSV } from "@/lib/utils/export-utils";
import countyData from "@/lib/data/kenya-counties";
import {
  useGetVaccinationStatsQuery,
  useGetCountyFarmersCumulativeQuery,
} from "@/lib/features/api/vaccination/vaccinationApi";
import {
  isNationalUser as checkIsNationalUser,
  getUserCounty,
} from "@/lib/features/api/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";

import type { KIAMISComparison } from "@/types/vaccination";

interface TooltipContent {
  text: string;
  x: number;
  y: number;
}

interface KenyaFertilizerChoroplethProps {
  kiamisData?: KIAMISComparison[];
}

const LeafletChoropleth = dynamic(
  () => import("@/components/maps/leaflet-choropleth"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-muted animate-pulse rounded-lg" />
    ),
  }
);

const DUMMY_COUNTY_DATA = [
  { county: "Mombasa", maleFarmers: 7000, femaleFarmers: 5500 },
  { county: "Kwale", maleFarmers: 35000, femaleFarmers: 30000 },
  { county: "Kilifi", maleFarmers: 48000, femaleFarmers: 47000 },
  { county: "Tana River", maleFarmers: 22000, femaleFarmers: 20000 },
  { county: "Lamu", maleFarmers: 9500, femaleFarmers: 8500 },
  { county: "Taita Taveta", maleFarmers: 24000, femaleFarmers: 21000 },
  { county: "Garissa", maleFarmers: 18000, femaleFarmers: 14000 },
  { county: "Wajir", maleFarmers: 16000, femaleFarmers: 12000 },
  { county: "Mandera", maleFarmers: 14000, femaleFarmers: 11000 },
  { county: "Marsabit", maleFarmers: 16500, femaleFarmers: 12500 },
  { county: "Isiolo", maleFarmers: 11500, femaleFarmers: 9500 },
  { county: "Meru", maleFarmers: 85000, femaleFarmers: 80000 },
  { county: "Tharaka", maleFarmers: 44000, femaleFarmers: 41000 },
  { county: "Embu", maleFarmers: 55000, femaleFarmers: 50000 },
  { county: "Kitui", maleFarmers: 75000, femaleFarmers: 70000 },
  { county: "Machakos", maleFarmers: 78000, femaleFarmers: 77000 },
  { county: "Makueni", maleFarmers: 68000, femaleFarmers: 67000 },
  { county: "Nyandarua", maleFarmers: 62000, femaleFarmers: 58000 },
  { county: "Nyeri", maleFarmers: 56000, femaleFarmers: 54000 },
  { county: "Kirinyaga", maleFarmers: 48000, femaleFarmers: 47000 },
  { county: "Murang'a", maleFarmers: 71000, femaleFarmers: 69000 },
  { county: "Kiambu", maleFarmers: 88000, femaleFarmers: 87000 },
  { county: "Turkana", maleFarmers: 21000, femaleFarmers: 17000 },
  { county: "West Pokot", maleFarmers: 29000, femaleFarmers: 26000 },
  { county: "Samburu", maleFarmers: 17000, femaleFarmers: 15000 },
  { county: "Trans Nzoia", maleFarmers: 82000, femaleFarmers: 78000 },
  { county: "Uasin Gishu", maleFarmers: 94000, femaleFarmers: 91000 },
  { county: "Keiyo-Marakwet", maleFarmers: 42000, femaleFarmers: 40000 },
  { county: "Nandi", maleFarmers: 64000, femaleFarmers: 61000 },
  { county: "Baringo", maleFarmers: 41000, femaleFarmers: 37000 },
  { county: "Laikipia", maleFarmers: 34000, femaleFarmers: 31000 },
  { county: "Nakuru", maleFarmers: 108000, femaleFarmers: 102000 },
  { county: "Narok", maleFarmers: 67000, femaleFarmers: 63000 },
  { county: "Kajiado", maleFarmers: 44000, femaleFarmers: 41000 },
  { county: "Kericho", maleFarmers: 74000, femaleFarmers: 71000 },
  { county: "Bomet", maleFarmers: 69000, femaleFarmers: 66000 },
  { county: "Kakamega", maleFarmers: 128000, femaleFarmers: 122000 },
  { county: "Vihiga", maleFarmers: 48000, femaleFarmers: 47000 },
  { county: "Bungoma", maleFarmers: 112000, femaleFarmers: 108000 },
  { county: "Busia", maleFarmers: 71000, femaleFarmers: 69000 },
  { county: "Siaya", maleFarmers: 78000, femaleFarmers: 77000 },
  { county: "Kisumu", maleFarmers: 66000, femaleFarmers: 64000 },
  { county: "Homa Bay", maleFarmers: 83000, femaleFarmers: 82000 },
  { county: "Migori", maleFarmers: 87000, femaleFarmers: 83000 },
  { county: "Kisii", maleFarmers: 96000, femaleFarmers: 94000 },
  { county: "Nyamira", maleFarmers: 58000, femaleFarmers: 57000 },
  { county: "Nairobi", maleFarmers: 13000, femaleFarmers: 12000 }
];

export default function KenyaFertilizerChoropleth({
  kiamisData = [],
}: KenyaFertilizerChoroplethProps) {
  const user = useAppSelector((state) => state.auth.user);
  const isNational = checkIsNationalUser(user);
  const userCounty = getUserCounty(user);

  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    data: vaccinationStatsResponse,
    isLoading,
    error,
  } = useGetVaccinationStatsQuery();
  const { data: countyFarmersResponse } = useGetCountyFarmersCumulativeQuery({
    period: "cumulative",
  });

  const kiamisMap = useMemo(() => {
    return new Map(
      kiamisData.map((d) => [d.county.toUpperCase(), d.kiamis_farmers])
    );
  }, [kiamisData]);

  const data = useMemo(() => {
    const allData = DUMMY_COUNTY_DATA.map((dummy) => {
      // Find API stats if available, otherwise default to dummy logic
      const apiItem = vaccinationStatsResponse?.totals_per_county?.find(
        (item) => item.county?.toUpperCase() === dummy.county.toUpperCase()
      );

      const totalFarmers = dummy.maleFarmers + dummy.femaleFarmers;
      const redeemedVouchers = apiItem ? apiItem.farmers : Math.floor(totalFarmers * 0.7); // Mock 70% redemption if no API
      const kiamisTarget = kiamisMap.get(dummy.county.toUpperCase()) || totalFarmers;

      const percentage = totalFarmers > 0 ? (redeemedVouchers / totalFarmers) * 100 : 0;
      const targetAchievement = kiamisTarget > 0 ? (redeemedVouchers / kiamisTarget) * 100 : 0;

      return {
        county: dummy.county,
        totalFarmers,
        maleFarmers: dummy.maleFarmers,
        femaleFarmers: dummy.femaleFarmers,
        redeemedVouchers,
        kiamisTarget,
        percentage,
        targetAchievement,
      };
    });

    if (!isNational && userCounty) {
      return allData.filter(
        (d) => d.county.toUpperCase() === userCounty.toUpperCase()
      );
    }

    return allData;
  }, [
    vaccinationStatsResponse,
    isNational,
    userCounty,
    kiamisMap,
  ]);

  const { maxValue, colorScale } = useMemo(() => {
    const maxVal = Math.max(...data.map((d) => d.totalFarmers), 1);
    return {
      maxValue: maxVal,
      colorScale: (value: number) => {
        const intensity = Math.min(value / maxVal, 1);
        const hue = 120;
        const saturation = 40 + intensity * 50;
        const lightness = 90 - intensity * 60;

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      },
    };
  }, [data]);

  const countyStatsMap = useMemo(() => {
    return new Map(data.map((d) => [d.county.toUpperCase(), d]));
  }, [data]);

  const handleExportCSV = () => {
    const csvData = data
      .sort((a, b) => b.redeemedVouchers - a.redeemedVouchers)
      .map((county) => ({
        County: county.county,
        "Total Farmers": county.totalFarmers,
        "Vouchers Redeemed": county.redeemedVouchers,
        // "KIAMIS Target": county.kiamisTarget,
        // "Redemption Rate (%)": county.percentage.toFixed(1),
        // "Target Achievement (%)": county.targetAchievement.toFixed(1),
      }));

    exportToCSV(
      csvData,
      `farmers-redemption-map-${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  const leafletData = data.map((county) => ({
    county: county.county,
    value: county.totalFarmers,
    totalValue: county.redeemedVouchers,
    percentage: county.percentage,
  }));

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voucher Redemption Map</CardTitle>
          <CardDescription>
            Geographic distribution of voucher redemptions across Kenya counties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full bg-muted/20 rounded-lg border">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Skeleton className="h-12 w-12 animate-spin text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voucher Redemption Map</CardTitle>
          <CardDescription>
            Geographic distribution of voucher redemptions across Kenya counties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full bg-muted/20 rounded-lg border flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-2" />
              <p className="text-sm font-semibold text-destructive">Error</p>
              <p className="text-sm text-muted-foreground">
                Failed to load voucher redemption data. Please try again later.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalKiamisTarget = data.reduce((sum, d) => sum + d.kiamisTarget, 0);
  const totalFarmersPopulation = data.reduce((sum, d) => sum + d.totalFarmers, 0);
  const overallAchievement =
    totalKiamisTarget > 0 ? (totalFarmersPopulation / totalKiamisTarget) * 100 : 0;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fertilizer Distribution Map</CardTitle>
              <CardDescription>
                Darker green colors indicate higher farmer populations
                per county
              </CardDescription>
            </div>

          </div>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="relative flex-1 border rounded-lg bg-muted/20 overflow-hidden">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 3300,
                  center: [37.5, 0.5],
                }}
                className="w-full h-auto"
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={countyData}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo: any) => {
                      const countyName =
                        geo.properties?.COUNTY?.toUpperCase() || "";
                      const countyData = countyStatsMap.get(countyName);
                      const farmerCount = countyData?.totalFarmers || 0;
                      const redeemedCount = countyData?.redeemedVouchers || 0;
                      const fillColor =
                        farmerCount > 0
                          ? colorScale(farmerCount)
                          : "#9ca3af";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke="hsl(var(--border))"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: fillColor,
                              opacity: 0.8,
                              outline: "none",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={(e: { pageX: any; pageY: any }) => {
                            const { pageX, pageY } = e;
                            setTooltipContent({
                              text: `${countyName}\nTotal Farmers: ${countyData?.totalFarmers.toLocaleString() || 0
                                }\nMale Farmers: ${countyData?.maleFarmers?.toLocaleString() || 0
                                }\nFemale Farmers: ${countyData?.femaleFarmers?.toLocaleString() || 0
                                }\nVouchers Redeemed: ${redeemedCount.toLocaleString()}\nKIAMIS Target: ${countyData?.kiamisTarget.toLocaleString() || 0
                                }\nRedemption Rate: ${countyData?.percentage.toFixed(1) || "0.0"
                                }%\nTarget Achievement: ${countyData?.targetAchievement.toFixed(1) ||
                                "0.0"
                                }%`,
                              x: pageX,
                              y: pageY,
                            });
                          }}
                          onMouseLeave={() => {
                            setTooltipContent(null);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {tooltipContent && (
                  <div
                    className="absolute bg-background border rounded-md px-3 py-2 text-sm shadow-lg whitespace-pre-line pointer-events-none z-50"
                    style={{
                      top: tooltipContent.y - 100,
                      left: tooltipContent.x - 200,
                    }}
                  >
                    {tooltipContent.text}
                  </div>
                )}
              </ComposableMap>
            </div>

            <div className="w-full lg:w-[450px] flex flex-col gap-6">
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-sm font-semibold mb-2">
                  Fertilizer Distribution
                </h4>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      0
                    </span>
                    <div className="flex-1 flex gap-0.5">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, idx) => (
                        <div
                          key={ratio}
                          className="flex-1 h-6 border-r border-border first:rounded-l last:rounded-r last:border-r-0"
                          style={{
                            backgroundColor: colorScale(maxValue * ratio),
                          }}
                          title={`${Math.round(
                            maxValue * (idx * 0.2)
                          )}-${Math.round(maxValue * ratio)}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {maxValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-8">
                    <span>Low Population</span>
                    <span>High Population</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Counties by Fertilizer Distribution
                  </h4>
                  <div className="max-h-[480px] overflow-y-auto border rounded-md">
                    <table className="w-full text-xs text-left">
                      <thead className="sticky top-0 bg-muted z-10 text-muted-foreground">
                        <tr>
                          <th className="py-2 px-2 font-medium">#</th>
                          <th className="py-2 px-2 font-medium">County</th>
                          <th className="py-2 px-2 font-medium text-right">Total</th>
                          <th className="py-2 px-2 font-medium text-right">Male</th>
                          <th className="py-2 px-2 font-medium text-right">Female</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {data
                          .sort((a, b) => b.totalFarmers - a.totalFarmers)
                          .map((county, index) => (
                            <tr key={county.county} className="hover:bg-muted/50">
                              <td className="py-2 px-2 text-muted-foreground">{index + 1}</td>
                              <td className="py-2 px-2 font-medium">{county.county}</td>
                              <td className="py-2 px-2 text-right">{county.totalFarmers.toLocaleString()}</td>
                              <td className="py-2 px-2 text-right text-muted-foreground">{county.maleFarmers.toLocaleString()}</td>
                              <td className="py-2 px-2 text-right text-muted-foreground">{county.femaleFarmers.toLocaleString()}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    Summary Statistics
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Counties
                      </span>
                      <span className="font-medium">{data.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Farmers
                      </span>
                      <span className="font-medium">
                        {totalFarmersPopulation.toLocaleString()}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        KIAMIS Target
                      </span>
                      <span className="font-medium">
                        {totalKiamisTarget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Target Achievement
                      </span>
                      <span className="font-medium">
                        {overallAchievement.toFixed(1)}%
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex items-center justify-between p-2 md:p-4 border-b shrink-0">
            <h2 className="text-sm md:text-lg font-semibold">
              Fertilizer Distribution Map - Fullscreen View
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 min-h-0 p-4">
              <LeafletChoropleth
                data={leafletData}
                valueLabel="Total Farmers"
                totalLabel="Farmers Redeemed"
                colorScale={colorScale}
              />
            </div>

            <div className="hidden lg:flex lg:w-[450px] flex-col gap-4 p-4 overflow-y-auto border-l">
              <div className="flex flex-col items-center lg:items-start border rounded-lg p-4 bg-card">
                <h4 className="text-sm font-semibold mb-3">
                  Fertilizer Distribution
                </h4>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      0
                    </span>
                    <div className="flex-1 flex gap-0.5">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, idx) => (
                        <div
                          key={ratio}
                          className="flex-1 h-8 border-r border-border first:rounded-l last:rounded-r last:border-r-0"
                          style={{
                            backgroundColor: colorScale(maxValue * ratio),
                          }}
                          title={`${Math.round(
                            maxValue * (idx * 0.2)
                          )}-${Math.round(maxValue * ratio)}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {maxValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-4">
                    <span>Low Population</span>
                    <span>High Population</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 px-2">
                <h4 className="text-sm font-semibold mb-2">
                  Counties by Fertilizer Distribution
                </h4>
                <div className="border rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="sticky top-0 bg-muted z-10 text-muted-foreground">
                      <tr>
                        <th className="py-2 px-2 font-medium">#</th>
                        <th className="py-2 px-2 font-medium">County</th>
                        <th className="py-2 px-2 font-medium text-right">Total</th>
                        <th className="py-2 px-2 font-medium text-right">Male</th>
                        <th className="py-2 px-2 font-medium text-right">Female</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {data
                        .sort((a, b) => b.totalFarmers - a.totalFarmers)
                        .map((county, index) => (
                          <tr key={county.county} className="hover:bg-muted/50">
                            <td className="py-2 px-2 text-muted-foreground">{index + 1}</td>
                            <td className="py-2 px-2 font-medium">{county.county}</td>
                            <td className="py-2 px-2 text-right">{county.totalFarmers.toLocaleString()}</td>
                            <td className="py-2 px-2 text-right text-muted-foreground">{county.maleFarmers.toLocaleString()}</td>
                            <td className="py-2 px-2 text-right text-muted-foreground">{county.femaleFarmers.toLocaleString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-card">
                <h4 className="text-sm font-semibold mb-3">
                  Summary Statistics
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Counties
                    </span>
                    <span className="font-medium">{data.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Farmers
                    </span>
                    <span className="font-medium">
                      {totalFarmersPopulation.toLocaleString()}
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-muted-foreground">KIAMIS Target</span>
                    <span className="font-medium">
                      {totalKiamisTarget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Target Achievement
                    </span>
                    <span className="font-medium">
                      {overallAchievement.toFixed(1)}%
                    </span>
                  </div> */}
                </div>
              </div>

              {/* <div className="border rounded-lg bg-card flex-1 flex flex-col">
                <div className="p-4 border-b">
                  <h4 className="text-sm font-semibold">All Counties</h4>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-muted">
                      <tr>
                        <th className="text-left p-2 font-medium">Rank</th>
                        <th className="text-left p-2 font-medium">County</th>
                        <th className="text-right p-2 font-medium">Redeemed</th>
                        <th className="text-right p-2 font-medium">KIAMIS</th>
                        <th className="text-right p-2 font-medium">
                          Achievement
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .sort((a, b) => b.redeemedVouchers - a.redeemedVouchers)
                        .map((county, index) => (
                          <tr key={county.county} className="border-t">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{county.county}</td>
                            <td className="p-2 text-right font-medium">
                              {county.redeemedVouchers.toLocaleString()}
                            </td>
                            <td className="p-2 text-right font-medium">
                              {county.kiamisTarget.toLocaleString()}
                            </td>
                            <td className="p-2 text-right font-medium">
                              {county.targetAchievement.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot className="sticky bottom-0 bg-muted">
                      <tr className="border-t-2 font-bold">
                        <td className="p-2" colSpan={2}>
                          Total
                        </td>
                        <td className="p-2 text-right">
                          {totalRedeemed.toLocaleString()}
                        </td>
                        <td className="p-2 text-right">
                          {totalKiamisTarget.toLocaleString()}
                        </td>
                        <td className="p-2 text-right">
                          {overallAchievement.toFixed(1)}%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
