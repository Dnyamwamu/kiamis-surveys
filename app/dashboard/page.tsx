"use client"

import React from "react"
import { useGetDailyRedemptionQuery } from "@/lib/features/api/fertilizer/fertilizerApi"
import {
  Loader2,
  Leaf,
  Calendar,
  Users,
  Package,
  DollarSign,
  ArrowLeft,
  Download,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminUnitFilter } from "@/components/admin-unit-filter"
import { RedemptionByAdminUnitsCard } from "@/components/dashboard/RedemptionByAdminUnitsCard"
import { RedemptionByProductTypeCard } from "@/components/dashboard/RedemptionByProductTypeCard"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { FertilizerTypeCard } from "@/components/dashboard/FertilizerTypeCard"

export default function FertilizerPage() {
  const { user } = useAuth()
  const isAdminUser = user?.role === "ADMIN" || user?.role === "SUPERADMIN"
  const isReviewer = user?.role === "REVIEWER"
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

  const { data, isLoading, error } = useGetDailyRedemptionQuery(
    {
      county: filters.county,
      subcounty: filters.subcounty,
      ward: filters.ward,
    },
    {
      skip: isReviewer && !filters.county,
    }
  )

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-KE").format(num)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-KE", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getErrorMessage = (err: unknown) => {
    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string"
    ) {
      return (err as { message: string }).message
    }

    return "An error occurred while fetching data. Please try again."
  }

  if (isLoading) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
        <p className="mt-4 font-medium text-muted-foreground">
          Loading fertilizer data...
        </p>
      </div>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <Package className="h-6 w-6 text-emerald-600" />
            Fertilizer Subsidy Dashboard
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            National Fertilizer E-Subsidy Dashboard
          </p>
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
      {/* Show message when no county is selected for reviewer-only users */}
      {isReviewer && !filters.county ? (
        <div className="flex min-h-100 flex-col items-center justify-center text-muted-foreground">
          <Leaf className="mb-4 h-16 w-16 opacity-50" />
          <p className="text-lg font-bold">Select Administrative Unit</p>
          <p className="mt-1 max-w-md text-center text-sm opacity-80">
            Please select a county from the filter above to view fertilizer
            dashboard data.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex min-h-100 flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-50" />
          <p className="mt-4 font-medium text-muted-foreground">
            Loading fertilizer data...
          </p>
        </div>
      ) : error ? (
        <div className="flex min-h-100 flex-col items-center justify-center text-destructive">
          <p className="text-lg font-bold">Failed to load data</p>
          <p className="mt-1 text-sm opacity-80">{getErrorMessage(error)}</p>
        </div>
      ) : !data ? (
        <div className="flex min-h-100 flex-col items-center justify-center text-muted-foreground">
          <Package className="mb-4 h-16 w-16 opacity-50" />
          <p className="text-lg font-bold">No Data Available</p>
          <p className="mt-1 max-w-md text-center text-sm opacity-80">
            No redemption data found for the selected administrative unit and
            date range.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {[
              {
                label: "Total Farmers",
                value: formatNumber(data.summary.farmers),
                description:
                  "Total farmers benefitted from the fertilizer e-subsidy.",
                icon: Users,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
              },
              {
                label: "Redemptions",
                value: formatNumber(data.summary.redemptions),
                description:
                  "Total successful fertilizer voucher redemption transactions.",
                icon: Leaf,
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
              },
              {
                label: "Units Issue",
                value: formatNumber(data.summary.units),
                description:
                  "Total fertilizer units issued to eligible beneficiaries.",
                icon: Package,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
              {
                label: "Total Value",
                value: formatCurrency(data.summary.total_value),
                description:
                  "Gross value of fertilizer distributed under the subsidy program.",
                icon: DollarSign,
                color: "text-emerald-600",
                bg: "bg-emerald-600/10",
              },
              {
                label: "Net Payment",
                value: formatCurrency(data.summary.client_payment),
                description:
                  "Total amount paid by farmers after subsidy deductions.",
                icon: DollarSign,
                color: "text-blue-600",
                bg: "bg-blue-600/10",
              },
            ].map((stat, i) => (
              <Card key={i} className="h-full py-4">
                <CardContent className="p-4 pt-0">
                  <div
                    className={cn(
                      "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
                      stat.bg
                    )}
                  >
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <p className="text-xl leading-tight font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/90">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Redemption by Admin Units */}
          <RedemptionByAdminUnitsCard
            county={filters.county}
            subcounty={filters.subcounty}
            ward={filters.ward}
          />

          <RedemptionByProductTypeCard
            county={filters.county}
            subcounty={filters.subcounty}
            ward={filters.ward}
          />

          <FertilizerTypeCard
            county={filters.county}
            subcounty={filters.subcounty}
            ward={filters.ward}
          />

          {/* Table Section */}
          <Card className="overflow-hidden py-0">
            <CardHeader className="flex-row items-center justify-between space-y-0 border-b px-6 py-4">
              <CardTitle className="text-base font-bold">
                Daily Distribution Activity
              </CardTitle>
              <Badge variant="secondary">{data?.description_for_daily}</Badge>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/10">
                      <TableHead className="px-6 py-4 text-xs font-bold tracking-wider uppercase">
                        Entry Date
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold tracking-wider uppercase">
                        Farmers
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold tracking-wider uppercase">
                        Units
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold tracking-wider uppercase">
                        Subsidy Value
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold tracking-wider uppercase">
                        Total Value
                      </TableHead>
                      <TableHead className="px-6 py-4 text-xs font-bold tracking-wider uppercase">
                        Farmer Payment
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.daily.map((entry, index) => (
                      <TableRow
                        key={index}
                        className="group transition-colors hover:bg-muted/30"
                      >
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                              {formatDate(entry.entry_date)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm font-medium">
                            {formatNumber(entry.farmers)}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className="font-bold tabular-nums"
                          >
                            {formatNumber(entry.units)} Units
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm font-bold text-foreground">
                            {formatCurrency(entry.subsidy)}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm font-bold text-foreground">
                            {formatCurrency(entry.total_value)}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm font-bold text-foreground">
                            {" "}
                            {formatCurrency(entry.client_payment)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>

            <CardFooter className="mt-0 border-t bg-muted/10 px-6 py-4">
              <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                <p>Showing 1-10 of {data.daily.length} daily entries</p>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
