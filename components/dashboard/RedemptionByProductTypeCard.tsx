"use client";

import React from "react";
import { useGetRedemptionProductsQuery } from "@/lib/features/api/fertilizer/fertilizerApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2, Package } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

type ProductMetric =
  | "farmers"
  | "units"
  | "number_of_redemptions"
  | "total_value"
  | "total_client_payment_amount";

interface ProductTypeResult {
  name: string;
  farmers: number;
  units: number;
  total_value: number;
  number_of_redemptions: number;
  total_client_payment_amount: number;
}

interface ProductTypeResponse {
  grouping: string;
  results: ProductTypeResult[];
}

interface RedemptionByProductTypeCardProps {
  county?: string;
  subcounty?: string;
  ward?: string;
}

const metricOptions: { value: ProductMetric; label: string }[] = [
  { value: "farmers", label: "No. of Farmers" },
  { value: "units", label: "Units Issued" },
  { value: "number_of_redemptions", label: "Redemptions" },
  { value: "total_value", label: "Total Value" },
  { value: "total_client_payment_amount", label: "Farmer Payment" },
];

export function RedemptionByProductTypeCard({
  county,
  subcounty,
  ward,
}: RedemptionByProductTypeCardProps) {
  const [selectedMetric, setSelectedMetric] =
    React.useState<ProductMetric>("farmers");
  const { data, isLoading, error } = useGetRedemptionProductsQuery({
    county: county || "",
    subcounty: subcounty || "",
    ward: ward || "",
  });

  const typedData = data as ProductTypeResponse | undefined;
  const results = typedData?.results ?? [];
  const hasData = results.length > 0;
  const selectedMetricLabel =
    metricOptions.find((m) => m.value === selectedMetric)?.label ||
    "No. of Farmers";

  const formatMetricValue = (value: number) => {
    if (
      selectedMetric === "total_value" ||
      selectedMetric === "total_client_payment_amount"
    ) {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Redemption by Product Type
            </CardTitle>
            <CardDescription>
              Compare product performance across key redemption metrics
              {county ? ` in ${county}` : ""}.
            </CardDescription>
          </div>
          <Select
            value={selectedMetric}
            onValueChange={(value) => setSelectedMetric(value as ProductMetric)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {metricOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Failed to load product redemption data.
          </div>
        ) : !hasData ? (
          <div className="text-center text-muted-foreground">
            No product redemption data available.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="h-72 w-full rounded-md border p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results} margin={{ top: 16, right: 8, left: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => formatMetricValue(Number(value))}
                    labelFormatter={(label) => `Product: ${label}`}
                  />
                  <Bar
                    dataKey={selectedMetric}
                    name={selectedMetricLabel}
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  >
                    <LabelList
                      dataKey={selectedMetric}
                      position="top"
                      formatter={(value: number) =>
                        formatMetricValue(Number(value))
                      }
                      className="fill-foreground text-[10px] font-medium"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Farmers</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Redemptions</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead className="text-right">Farmer Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.farmers)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.units)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.number_of_redemptions)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_value)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_client_payment_amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

