/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetRedemptionProductsQuery } from "@/lib/features/api/fertilizer/fertilizerApi";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RedemptionProduct {
  name: string;
  farmers: number;
  units: number;
  total_value: number;
  number_of_redemptions: number;
  total_client_payment_amount: number;
}

interface RedemptionData {
  grouping: string;
  results: RedemptionProduct[];
}

const COLORS = [
  "#16a34a", // Emerald-600
  "#e30f0fff", // Red
  "#ffee00ff", // Yellow
  "#86efac", // Green-300
  "#bbf7d0", // Green-200
  "#dcfce7", // Green-100
];

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const formatCurrency = (amount: number) => {
      if (typeof amount !== "number") return "KES 0";
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const formatNumber = (num: number) => {
      if (typeof num !== "number") return "0";
      return new Intl.NumberFormat("en-KE").format(num);
    };

    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-xl text-xs min-w-[200px]">
        <p className="font-bold text-foreground text-sm mb-2 border-b pb-1">
          {data.name}
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
              Farmers
            </span>
            <span className="font-bold text-primary">
              {formatNumber(data.farmers)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
              Units
            </span>
            <span className="font-semibold tabular-nums">
              {formatNumber(data.units)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
              Total Value
            </span>
            <span className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {formatCurrency(data.total_value)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
              Redemptions
            </span>
            <span className="font-semibold tabular-nums">
              {formatNumber(data.number_of_redemptions)}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
              Farmer Payment
            </span>
            <span className="font-semibold tabular-nums text-blue-600 dark:text-blue-400">
              {formatCurrency(data.total_client_payment_amount)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function RedemptionProductsCard() {
  const { data, isLoading, error } = useGetRedemptionProductsQuery(undefined);
  const [selectedProduct, setSelectedProduct] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5" />
          <h3 className="font-semibold text-foreground">
            Product Redemption Summary
          </h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading redemption data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("ERROR:", error);
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5" />
          <h3 className="font-semibold text-foreground">
            Product Redemption Summary
          </h3>
        </div>
        <div className="text-center py-8 text-destructive">
          Failed to load redemption data
        </div>
      </div>
    );
  }

  const redemptionData = data as RedemptionData;

  const formatCurrency = (amount: number) => {
    if (typeof amount !== "number") return "KES 0";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (typeof num !== "number") return "0";
    return new Intl.NumberFormat("en-KE").format(num);
  };

  if (!redemptionData?.results || !Array.isArray(redemptionData.results)) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5" />
          <h3 className="font-semibold text-foreground">
            Product Redemption Summary
          </h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          No redemption data available
        </div>
      </div>
    );
  }

  // Filter results based on selection
  const filteredResults =
    selectedProduct === "all"
      ? redemptionData.results
      : redemptionData.results.filter((p) => p.name === selectedProduct);

  // Prepare data for the pie chart
  const chartData = filteredResults.map((p) => ({
    ...p,
    value: p.farmers,
  }));

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            Product Redemption Summary
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-blue-200 p-1 rounded-lg border border-border/50 self-start sm:self-auto">
          <Filter className="w-3.5 h-3.5 ml-2 text-muted-foreground" />
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-transparent text-xs font-medium focus:outline-none pr-2 py-1 appearance-none cursor-pointer"
          >
            <option value="all">All Products</option>
            {redemptionData.results.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Redemption statistics by product type
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Pie Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry) => {
                  const originalIndex = redemptionData.results.findIndex(
                    (p) => p.name === entry.name,
                  );
                  return (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[originalIndex % COLORS.length]}
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  paddingLeft: "20px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Quick Insights */}
        <div className="flex flex-col justify-center space-y-4 bg-muted/30 p-6 rounded-2xl border border-border/50">
          <h4 className="font-medium text-sm text-muted-foreground">
            {selectedProduct === "all"
              ? "Top Level Insights"
              : `${selectedProduct} Insights`}
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {selectedProduct === "all"
                  ? "Total Products Trailing"
                  : "Product Status"}
              </span>
              <Badge variant="secondary">
                {selectedProduct === "all" ? filteredResults.length : "Active"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {selectedProduct === "all"
                  ? "Dominant Product"
                  : "Market Share"}
              </span>
              <span className="font-semibold text-sm">
                {selectedProduct === "all"
                  ? chartData.sort((a, b) => b.value - a.value)[0]?.name
                  : (
                      (filteredResults[0].farmers /
                        redemptionData.results.reduce(
                          (acc, curr) => acc + curr.farmers,
                          0,
                        )) *
                      100
                    ).toFixed(1) + "%"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {selectedProduct === "all"
                  ? "Average Reach"
                  : "Redemption Rate"}
              </span>
              <span className="font-semibold text-sm">
                {selectedProduct === "all"
                  ? formatNumber(
                      Math.round(
                        chartData.reduce((acc, curr) => acc + curr.value, 0) /
                          chartData.length,
                      ),
                    ) + " Farmers"
                  : (
                      (filteredResults[0].number_of_redemptions /
                        filteredResults[0].units) *
                      100
                    ).toFixed(1) + "%"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed List */}
      <div className="space-y-6">
        <h4 className="font-medium text-sm text-muted-foreground mb-2">
          {selectedProduct === "all"
            ? "Detailed Product Breakdown"
            : "Product Specification"}
        </h4>
        {filteredResults.map((product) => {
          // Find original index for consistent coloring
          const originalIndex = redemptionData.results.findIndex(
            (p) => p.name === product.name,
          );
          return (
            <div
              key={product?.name || originalIndex}
              className={cn(
                "p-4 rounded-lg border bg-card/50",
                originalIndex % 2 === 0
                  ? "border-border/50"
                  : "border-muted/50",
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="font-medium"
                    style={{
                      borderLeft: `4px solid ${COLORS[originalIndex % COLORS.length]}`,
                    }}
                  >
                    {product?.name || "Unknown Product"}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatNumber(product?.farmers)}
                  </div>
                  <div className="text-xs text-muted-foreground">Farmers</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Units</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatNumber(product?.units)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Value</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatCurrency(product?.total_value)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Redemptions</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatNumber(product?.number_of_redemptions)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Farmer Payment</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatCurrency(product?.total_client_payment_amount)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {redemptionData?.results && (
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="text-center text-sm text-muted-foreground">
            Data grouped by:{" "}
            <Badge variant="outline">{redemptionData.grouping}</Badge>
          </div>
        </div>
      )}
    </div>
  );
}
