"use client";

import React from "react";
import { useGetDailyRedemptionQuery } from "@/lib/features/api/fertilizer/fertilizerApi";
import {
  Loader2,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const CustomDailyTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-xs min-w-[150px]">
        <p className="font-bold text-foreground mb-2 flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((entry: any, i: number) => (
            <div key={i} className="flex justify-between gap-4">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-bold tabular-nums text-foreground">
                {typeof entry.value === "number"
                  ? new Intl.NumberFormat("en-KE").format(entry.value)
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function FertilizerDailyTrendCard() {
  const { data, isLoading, error } = useGetDailyRedemptionQuery({});

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            Fertilizer Redemption Trend
          </h3>
        </div>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          <span className="ml-3 text-muted-foreground font-medium">
            Loading trend data...
          </span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-destructive" />
          <h3 className="font-semibold text-foreground">
            Fertilizer Redemption Trend
          </h3>
        </div>
        <div className="text-center py-12 text-destructive bg-destructive/5 rounded-2xl border border-destructive/10">
          <p className="font-medium">Failed to load redemption trend data</p>
          <p className="text-xs mt-1 opacity-70">
            Please check your connection or try again later
          </p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-KE", { notation: "compact" }).format(num);
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          {
            label: "Farmers",
            value: formatNumber(data.summary.farmers),
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Redemptions",
            value: formatNumber(data.summary.redemptions),
            icon: ShoppingCart,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            label: "Units",
            value: formatNumber(data.summary.units),
            icon: Package,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Total Value",
            value: formatCurrency(data.summary.total_value),
            icon: DollarSign,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            label: "Farmer Payment",
            value: formatCurrency(data.summary.client_payment),
            icon: DollarSign,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass-card p-3 flex flex-col items-center text-center"
          >
            <div
              className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-lg font-bold text-foreground leading-tight">
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Redemption Trend
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.description_for_daily}
              </p>
            </div>
            <div className="flex gap-2 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-full text-primary border border-primary/20">
                DAILY TREND
              </span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.daily}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorFarmers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="entry_date"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={30}
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => formatNumber(val)}
                />
                <RechartsTooltip content={<CustomDailyTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "10px", paddingBottom: "20px" }}
                />
                <Area
                  type="monotone"
                  dataKey="farmers"
                  name="Farmers"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFarmers)"
                />
                <Area
                  type="monotone"
                  dataKey="units"
                  name="Units"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUnits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="glass-card p-5">
          <div className="mb-6">
            <h3 className="font-semibold text-foreground">Module Overview</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {data.description_for_summary}
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Efficiency Metric
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  REAL-TIME
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-foreground/80 lowercase">
                    Units per Redemption
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {(data.summary.units / data.summary.redemptions).toFixed(1)}
                  </span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-[75%]" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Financial Overview
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                      Avg Value per Unit
                    </p>
                    <p className="text-sm font-bold">
                      {formatCurrency(
                        data.summary.total_value / data.summary.units,
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                      Reach Efficiency
                    </p>
                    <p className="text-sm font-bold">
                      {formatNumber(data.summary.farmers)} Total REACH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Data Source: Fertilizer API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
