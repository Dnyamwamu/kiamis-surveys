"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataMap, useTopology } from "@/components/map-fresh";

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

export default function KenyaSeedsD3Map() {
  const topology = useTopology();

  const data = useMemo(() => {
    return DUMMY_COUNTY_DATA.map((dummy) => {
      const totalFarmers = dummy.maleFarmers + dummy.femaleFarmers;
      const redeemedVouchers = Math.floor(totalFarmers * 0.65); // Mock 65% seed voucher redemption rate
      const redemptionRate = totalFarmers > 0 ? (redeemedVouchers / totalFarmers) * 100 : 0;
      return {
        county: dummy.county,
        totalFarmers,
        redeemedVouchers,
        redemptionRate,
      };
    });
  }, []);

  const countyStatsMap = useMemo(() => {
    return new Map(data.map((d) => [d.county.toUpperCase(), d]));
  }, [data]);

  const { maxValue, colorScale } = useMemo(() => {
    const maxVal = Math.max(...data.map((d) => d.redeemedVouchers), 1);
    return {
      maxValue: maxVal,
      colorScale: (value: number) => {
        const intensity = Math.min(value / maxVal, 1);
        const hue = 38; // Seed Amber / Gold
        const saturation = 55 + intensity * 35;
        const lightness = 88 - intensity * 50;

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      },
    };
  }, [data]);

  const mapData = useMemo(() => {
    return data.reduce((acc, d) => {
      acc[d.county.toUpperCase()] = {
        value: d.redeemedVouchers,
        color: colorScale(d.redeemedVouchers),
      };
      return acc;
    }, {} as Record<string, { value: number; color: string }>);
  }, [data, colorScale]);

  const totalRedeemedVouchers = useMemo(() => {
    return data.reduce((sum, d) => sum + d.redeemedVouchers, 0);
  }, [data]);

  const averageRedemptionRate = useMemo(() => {
    return data.reduce((sum, d) => sum + d.redemptionRate, 0) / data.length;
  }, [data]);

  if (topology == null) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
          <CardTitle className="text-xl font-bold text-gray-900">Seeds Distribution Map (D3)</CardTitle>
          <CardDescription>
            Geographic distribution of seeds voucher redemptions using the D3 vector map
          </CardDescription>
        </CardHeader>
        <CardContent className="py-20 flex items-center justify-center">
          <Skeleton className="h-12 w-12 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          Seeds Voucher Redemption Map
        </CardTitle>
        <CardDescription>
          Vibrant Amber/Gold color hues highlighting crop seeds distribution achievements across Kenya.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative flex flex-col lg:flex-row gap-6">

          {/* LEFT COLUMN: D3 INTERACTIVE MAP */}
          <div className="relative flex-1 border rounded-lg bg-gray-50/30 overflow-hidden min-h-[480px]">
            <DataMap
              topology={topology}
              data={mapData}
              tooltipContents={(regionKey) => {
                const countyName = regionKey.toUpperCase();
                const countyStats = countyStatsMap.get(countyName);
                if (!countyStats) {
                  return <div className="p-1 font-bold text-gray-500">{regionKey} – No Data</div>;
                }
                return (
                  <div className="space-y-1 p-1">
                    <div className="font-bold text-gray-900">{countyStats.county}</div>
                    <div className="text-xs text-gray-700">
                      Vouchers Redeemed: <span className="font-semibold text-amber-700">{countyStats.redeemedVouchers.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Redemption Rate: {countyStats.redemptionRate.toFixed(1)}% | Registered Farmers: {countyStats.totalFarmers.toLocaleString()}
                    </div>
                  </div>
                );
              }}
              projectionType="geoMercator"
            />
          </div>

          {/* RIGHT COLUMN: STATISTICS & COLOR LEGEND */}
          <div className="w-full lg:w-[420px] flex flex-col gap-6">

            {/* Color Scale Legend */}
            <div className="flex flex-col items-center lg:items-start border border-gray-100 p-4 rounded-xl bg-gray-50/40">
              <h4 className="text-sm font-semibold mb-3 text-gray-900">
                Redeemed Subsidy Vouchers
              </h4>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                    0
                  </span>
                  <div className="flex-1 flex gap-0.5">
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, idx) => (
                      <div
                        key={ratio}
                        className="flex-1 h-6 border-r border-white/60 first:rounded-l last:rounded-r last:border-r-0"
                        style={{
                          backgroundColor: colorScale(maxValue * ratio),
                        }}
                        title={`${Math.round(maxValue * (idx * 0.2))}-${Math.round(maxValue * ratio)}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                    {maxValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-medium px-4">
                  <span>Low Redemption</span>
                  <span>High Redemption</span>
                </div>
              </div>
            </div>

            {/* Scrollable Counties Table */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-900">
                Counties by Seeds Redemption
              </h4>
              <div className="max-h-[300px] overflow-y-auto border border-gray-100 rounded-lg shadow-inner">
                <table className="w-full text-xs text-left">
                  <thead className="sticky top-0 bg-gray-50 z-10 text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="py-2 px-3 font-semibold">#</th>
                      <th className="py-2 px-3 font-semibold">County</th>
                      <th className="py-2 px-3 font-semibold text-right">Redeemed</th>
                      <th className="py-2 px-3 font-semibold text-right">Registered</th>
                      <th className="py-2 px-3 font-semibold text-right">Rate (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data
                      .sort((a, b) => b.redeemedVouchers - a.redeemedVouchers)
                      .map((county, index) => (
                        <tr key={county.county} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-2 px-3 text-gray-400 font-medium">{index + 1}</td>
                          <td className="py-2 px-3 font-bold text-gray-700">{county.county}</td>
                          <td className="py-2 px-3 text-right font-semibold text-amber-700">
                            {county.redeemedVouchers.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-500">
                            {county.totalFarmers.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right font-medium text-gray-600">
                            {county.redemptionRate.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Statistics */}
            <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/40 space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
                Program Performance
              </h4>
              <div className="space-y-2 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Counties Covered</span>
                  <span className="text-gray-900 font-bold">{data.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Vouchers Redeemed</span>
                  <span className="text-amber-700 font-bold text-sm">
                    {totalRedeemedVouchers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Redemption Rate</span>
                  <span className="text-gray-900 font-bold">
                    {averageRedemptionRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
