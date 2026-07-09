"use client"

import React, { useState } from "react"
import { useGetRedemptionByAdminUnitsQuery } from "@/lib/features/api/fertilizer/fertilizerApi"
import { Badge } from "@/components/ui/badge"
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
  Loader2,
  MapPin,
  Users,
  Package,
  DollarSign,
  Receipt,
} from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/utils"
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

interface RedemptionByAdminUnitsCardProps {
  county?: string
  subcounty?: string
  ward?: string
}

export function RedemptionByAdminUnitsCard({
  county,
  subcounty,
  ward,
}: RedemptionByAdminUnitsCardProps) {
  const [fertilizerType, setFertilizerType] = useState<string>("")
  const [selectedMetric, setSelectedMetric] = useState<
    "farmers" | "units" | "redemptions" | "total_value" | "client_payment"
  >("farmers")
  const fertilizerTypeValue = fertilizerType || "all"

  const { data, isLoading, error } = useGetRedemptionByAdminUnitsQuery({
    county: county || "",
    subcounty: subcounty || "",
    ward: ward || "",
    fertilizer_type: fertilizerType || "",
  })

  const getGroupingLabel = () => {
    if (ward) return "Ward"
    if (subcounty) return "Sub-County"
    if (county) return "County"
    return "County"
  }

  const getGroupingIcon = () => {
    if (ward) return <MapPin className="h-4 w-4" />
    if (subcounty) return <MapPin className="h-4 w-4" />
    return <MapPin className="h-4 w-4" />
  }
  const results = data?.results ?? []
  const hasData = results.length > 0
  const totalFarmers = results.reduce((sum, item) => sum + item.farmers, 0)
  const totalUnits = results.reduce((sum, item) => sum + item.units, 0)
  const totalValue = results.reduce((sum, item) => sum + item.total_value, 0)
  const totalRedemptions = results.reduce(
    (sum, item) => sum + item.number_of_redemptions,
    0
  )
  const totalClientPayment = results.reduce(
    (sum, item) => sum + item.total_client_payment_amount,
    0
  )

  const metricOptions: {
    value:
      | "farmers"
      | "units"
      | "redemptions"
      | "total_value"
      | "client_payment"
    label: string
  }[] = [
    { value: "farmers", label: "No. of Farmers" },
    { value: "units", label: "Units Issued" },
    { value: "redemptions", label: "Redemptions" },
    { value: "total_value", label: "Total Value" },
    { value: "client_payment", label: "Farmer Payment" },
  ]

  const metricLabel =
    metricOptions.find((option) => option.value === selectedMetric)?.label ||
    "No. of Farmers"

  const chartData = results.map((item) => ({
    name: item.name,
    farmers: item.farmers,
    units: item.units,
    redemptions: item.number_of_redemptions,
    total_value: item.total_value,
    client_payment: item.total_client_payment_amount,
  }))

  const formatMetricValue = (value: number) => {
    if (
      selectedMetric === "total_value" ||
      selectedMetric === "client_payment"
    ) {
      return formatCurrency(value)
    }
    return formatNumber(value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getGroupingIcon()}
              Redemption by {getGroupingLabel()}
            </CardTitle>
            <CardDescription>
              Showing fertilizer redemption statistics by administrative units
              {county && (
                <span className="ml-1">
                  in <Badge variant="outline">{county}</Badge>
                  {subcounty && (
                    <span>
                      {" "}
                      / <Badge variant="outline">{subcounty}</Badge>
                      {ward && (
                        <span>
                          {" "}
                          / <Badge variant="outline">{ward}</Badge>
                        </span>
                      )}
                    </span>
                  )}
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedMetric}
              onValueChange={(value) =>
                setSelectedMetric(
                  value as
                    | "farmers"
                    | "units"
                    | "redemptions"
                    | "total_value"
                    | "client_payment"
                )
              }
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                {metricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={fertilizerTypeValue}
              onValueChange={(value) =>
                setFertilizerType(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Seasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="planting">Planting</SelectItem>
                <SelectItem value="topdressing">Top Dressing</SelectItem>
                <SelectItem value="fertilizer not specified">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Error loading redemption data
          </div>
        ) : !hasData ? (
          <div className="text-center text-muted-foreground">
            No redemption data available
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-md border p-4">
              <div className="mb-3 text-sm font-medium text-muted-foreground">
                {metricLabel} by {getGroupingLabel()}
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      angle={-25}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value) => formatMetricValue(Number(value))}
                      labelFormatter={(label) =>
                        `${getGroupingLabel()}: ${label}`
                      }
                    />
                    <Bar
                      dataKey={selectedMetric}
                      name={metricLabel}
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
            </div>

            {/* Data Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/10 font-bold">
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>{getGroupingLabel()}</TableHead>
                    <TableHead className="text-right">Farmers</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Redemptions</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead className="text-right">Total Subsidy</TableHead>
                    <TableHead className="text-right">Farmer Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-bold">{item.name}</TableCell>
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
                      <TableCell className="text-right">{0}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_client_payment_amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
