"use client"

import React from "react"
import { useGetFertilizerTypesQuery } from "@/lib/features/api/fertilizer/fertilizerApi"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Loader2, Package } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { FertilizerTypesResponse } from "@/types/fertilizer"

type FertilizerTypeMetric =
  | "farmers"
  | "units"
  | "number_of_redemptions"
  | "total_value"
  | "total_client_payment_amount"

interface FertilizerTypeCardProps {
  county?: string
  subcounty?: string
  ward?: string
}

const metricOptions: { value: FertilizerTypeMetric; label: string }[] = [
  { value: "farmers", label: "No. of Farmers" },
  { value: "units", label: "Units Issued" },
  { value: "number_of_redemptions", label: "Redemptions" },
  { value: "total_value", label: "Total Value" },
  { value: "total_client_payment_amount", label: "Farmer Payment" },
]

export function FertilizerTypeCard({
  county,
  subcounty,
  ward,
}: FertilizerTypeCardProps) {
  const [selectedMetric, setSelectedMetric] =
    React.useState<FertilizerTypeMetric>("farmers")
  const { data, isLoading, error } = useGetFertilizerTypesQuery({
    county: county || "",
    subcounty: subcounty || "",
    ward: ward || "",
  })

  const results = (
    Array.isArray(data) ? data : data ? [data] : []
  ) as FertilizerTypesResponse[]
  const hasData = results.length > 0
  const selectedMetricLabel =
    metricOptions.find((m) => m.value === selectedMetric)?.label ||
    "No. of Farmers"

  const formatMetricValue = (value: number) => {
    if (
      selectedMetric === "total_value" ||
      selectedMetric === "total_client_payment_amount"
    ) {
      return formatCurrency(value)
    }
    return formatNumber(value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Redemption by Fertilizer Type
            </CardTitle>
            <CardDescription>
              Compare fertilizer type performance across key redemption metrics
              {county ? ` in ${county}` : ""}.
            </CardDescription>
          </div>
          <Select
            value={selectedMetric}
            onValueChange={(value) =>
              setSelectedMetric(value as FertilizerTypeMetric)
            }
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
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Failed to load fertilizer type redemption data.
          </div>
        ) : !hasData ? (
          <div className="text-center text-muted-foreground">
            No fertilizer type redemption data available.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="h-72 w-full rounded-md border p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={results}
                  margin={{ top: 16, right: 8, left: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="fertilizer_type" tick={{ fontSize: 11 }} />
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
                    <TableHead>Fertilizer Type</TableHead>
                    <TableHead className="text-right">Farmers</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Redemptions</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead className="text-right">Farmer Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item) => (
                    <TableRow key={item.fertilizer_type}>
                      <TableCell className="font-medium">
                        {item.fertilizer_type}
                      </TableCell>
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
  )
}
