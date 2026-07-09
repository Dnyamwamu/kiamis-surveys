"use client"

import React, { useState } from "react"
import { useGetRedemptionByValuechainsQuery } from "@/lib/features/api/fertilizer/fertilizerApi"
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
  ArrowLeft,
  Leaf,
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
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { AdminUnitFilter } from "../admin-unit-filter"

export function RedemptionByValuchainsCard() {
  const { user } = useAuth()
  const isAdminUser = user?.role === "ADMIN" || user?.role === "SUPERADMIN"
  const defaultCounty = isAdminUser
    ? ""
    : user?.county?.name || user?.profile?.county || ""
  // Admin users should be able to view all counties by default, while reviewers stay scoped.
  const defaultSubCounty = ""
  const defaultWard = ""

  const [filters, setFilters] = React.useState({
    county: defaultCounty,
    subcounty: defaultSubCounty,
    ward: defaultWard,
  })
  const [fertilizerType, setFertilizerType] = useState<string>("")
  const [selectedMetric, setSelectedMetric] = useState<
    "farmers" | "units" | "redemptions" | "total_value" | "client_payment"
  >("farmers")
  const fertilizerTypeValue = fertilizerType || "all"

  const { data, isLoading, error } = useGetRedemptionByValuechainsQuery(
    {
      county: filters.county,
      subcounty: filters.subcounty,
      ward: filters.ward,
    },
    {
      skip: !filters.county,
    }
  )

  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null)
  const [showAdvice, setShowAdvice] = useState(false)

  React.useEffect(() => {
    if (isLoading && !loadingStartTime) {
      setLoadingStartTime(Date.now())
    } else if (!isLoading) {
      setLoadingStartTime(null)
      setShowAdvice(false)
    }
  }, [isLoading, loadingStartTime])

  React.useEffect(() => {
    if (loadingStartTime && isLoading) {
      const timer = setTimeout(() => {
        setShowAdvice(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [loadingStartTime, isLoading])

  const handleFilterChange = (newFilters: {
    county: string
    subcounty: string
    ward: string
  }) => {
    setFilters(newFilters)
  }

  React.useEffect(() => {
    if (!defaultCounty) return

    setFilters((prev) => {
      if (prev.county) return prev
      return {
        county: defaultCounty,
        subcounty: defaultSubCounty,
        ward: defaultWard,
      }
    })
  }, [defaultCounty, defaultSubCounty, defaultWard])

  const getGroupingLabel = () => {
    if (filters.ward) return "Ward"
    if (filters.subcounty) return "Sub-County"
    if (filters.county) return "County"
    return "County"
  }

  const getGroupingIcon = () => {
    if (filters.ward) return <MapPin className="h-4 w-4" />
    if (filters.subcounty) return <MapPin className="h-4 w-4" />
    return <MapPin className="h-4 w-4" />
  }
  const results = data?.results ?? []
  const hasData = results.length > 0
  const totalFarmers = results.reduce(
    (sum, item) => sum + item.number_of_farmers,
    0
  )
  const totalUnits = results.reduce(
    (sum, item) => sum + item.total_number_of_product_units,
    0
  )
  const totalProductValue = results.reduce(
    (sum, item) => sum + item.total_product_value,
    0
  )
  const totalSubsidyAmount = results.reduce(
    (sum, item) => sum + item.total_subsidy_amount,
    0
  )
  const totalClientPaymentAmount = results.reduce(
    (sum, item) => sum + item.total_client_payment_amount,
    0
  )
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
      | "total_product_value"
      | "total_subsidy_amount"
    label: string
  }[] = [
    { value: "farmers", label: "No. of Farmers" },
    { value: "units", label: "Units Issued" },
    { value: "redemptions", label: "Redemptions" },
    { value: "total_value", label: "Total Value" },
    { value: "client_payment", label: "Farmer Payment" },
    { value: "total_product_value", label: "Total Product Value" },
    { value: "total_subsidy_amount", label: "Total Subsidy Amount" },
  ]

  const metricLabel =
    metricOptions.find((option) => option.value === selectedMetric)?.label ||
    "No. of Farmers"

  const chartData = results.map((item) => ({
    name: item.redeemed_value_chain,
    farmers: item.number_of_farmers,
    units: item.total_number_of_product_units,
    redemptions: item.number_of_redemptions,
    total_value: item.total_product_value,
    subsidy_amount: item.total_subsidy_amount,
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

  if (isLoading) {
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
                Showing Value-chains statistics by administrative units
                {filters.county && (
                  <span className="ml-1">
                    in <Badge variant="outline">{filters.county}</Badge>
                    {filters.subcounty && (
                      <span>
                        {" "}
                        / <Badge variant="outline">{filters.subcounty}</Badge>
                        {filters.ward && (
                          <span>
                            {" "}
                            / <Badge variant="outline">{filters.ward}</Badge>
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          {/* Filter Section - Always visible */}
          <Card className="p-4 py-4">
            <AdminUnitFilter
              onFilterChange={handleFilterChange}
              defaultCounty={defaultCounty}
              defaultSubCounty={defaultSubCounty}
              defaultWard={defaultWard}
              userRole={user?.role}
            />
          </Card>
        </CardHeader>
        <CardContent>
          {showAdvice ? (
            <div className="flex min-h-100 flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary opacity-50" />
              <p className="mb-2 font-medium">
                Loading is taking longer than expected.
              </p>
              <p className="max-w-md text-center text-sm opacity-80">
                Please select a county from the filter above to populate the
                data.
              </p>
            </div>
          ) : (
            <div className="flex min-h-100 flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
              <p className="mt-4 font-medium text-muted-foreground">
                Loading Value Chain data...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center text-destructive">
        <p className="text-lg font-bold">Error loading data</p>
        <p className="mt-1 text-sm opacity-80">
          Please try again later or check your connection.
        </p>
      </div>
    )
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
              Showing Value-chains statistics by administrative units
              {filters.county && (
                <span className="ml-1">
                  in <Badge variant="outline">{filters.county}</Badge>
                  {filters.subcounty && (
                    <span>
                      {" "}
                      / <Badge variant="outline">{filters.subcounty}</Badge>
                      {filters.ward && (
                        <span>
                          {" "}
                          / <Badge variant="outline">{filters.ward}</Badge>
                        </span>
                      )}
                    </span>
                  )}
                </span>
              )}
            </CardDescription>
          </div>
        </div>
        {/* Filter Section - Always visible */}
        <Card className="p-4 py-4">
          <AdminUnitFilter
            onFilterChange={handleFilterChange}
            defaultCounty={defaultCounty}
            defaultSubCounty={defaultSubCounty}
            defaultWard={defaultWard}
            userRole={user?.role}
          />
        </Card>
      </CardHeader>
      <CardContent>
        {/* Show message when no county is selected */}
        {!filters.county ? (
          <div className="flex min-h-100 flex-col items-center justify-center text-muted-foreground">
            <Leaf className="mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg font-bold">Select Administrative Unit</p>
            <p className="mt-1 max-w-md text-center text-sm opacity-80">
              Please select a county from the filter above to view fertilizer
              dashboard data.
            </p>
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
              <div className="mb-3 flex items-center justify-between text-sm font-medium text-muted-foreground">
                <div>
                  {metricLabel} by Valuechains
                  {filters.county && (
                    <span className="ml-1">
                      in <Badge variant="outline">{filters.county}</Badge>
                      {filters.subcounty && (
                        <span>
                          {" "}
                          / <Badge variant="outline">{filters.subcounty}</Badge>
                          {filters.ward && (
                            <span>
                              {" "}
                              / <Badge variant="outline">{filters.ward}</Badge>
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  )}
                </div>
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
                      labelFormatter={(label) => `Valuechain: ${label}`}
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
                        formatter={(value) => formatMetricValue(Number(value))}
                        className="fill-foreground text-[10px] font-medium"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4 md:grid-cols-3">
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Farmers</span>
                </div>
                <div className="text-lg font-bold">
                  {formatNumber(totalFarmers)}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Units</span>
                </div>
                <div className="text-lg font-bold">
                  {formatNumber(totalUnits)}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <Receipt className="h-4 w-4" />
                  <span className="text-sm">Redemptions</span>
                </div>
                <div className="text-lg font-bold">
                  {formatNumber(totalRedemptions)}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Product Value</span>
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalProductValue)}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Subsidy Value</span>
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalSubsidyAmount)}
                </div>
              </div>

              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Farmer Payment</span>
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalClientPayment)}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-green-50 font-extrabold text-green-950">
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Value Chain</TableHead>
                    <TableHead className="text-right">Beneficiaries</TableHead>
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
                      <TableCell className="font-bold">
                        {item.redeemed_value_chain}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.number_of_farmers)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.total_number_of_product_units)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.number_of_redemptions)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_product_value)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_subsidy_amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_client_payment_amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t font-semibold">
                    <TableCell />
                    <TableCell>Totals</TableCell>
                    <TableCell className="text-right">
                      {formatNumber(totalFarmers)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(totalUnits)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(totalRedemptions)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totalProductValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totalSubsidyAmount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totalClientPayment)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
