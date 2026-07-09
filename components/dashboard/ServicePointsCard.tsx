"use client"

import React, { useState } from "react"
import { useGetServicePointsQuery } from "@/lib/features/api/fertilizer/fertilizerApi"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, Users, ArrowLeft, Leaf } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { AdminUnitFilter } from "../admin-unit-filter"
import { ServicePoint, ServicePointsResponse } from "@/types/fertilizer"

export function ServicePointsCard() {
  const { user } = useAuth()
  const isAdminUser = user?.role === "ADMIN" || user?.role === "SUPERADMIN"
  const defaultCounty = isAdminUser
    ? ""
    : user?.county?.name || user?.profile?.county || ""

  const [filters, setFilters] = React.useState({
    county: defaultCounty,
    subcounty: "",
    ward: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useGetServicePointsQuery(
    {
      county: filters.county,
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
    setFilters((prev) => ({
      ...prev,
      county: newFilters.county,
      subcounty: newFilters.subcounty,
      ward: newFilters.ward,
    }))
    setCurrentPage(1)
  }

  React.useEffect(() => {
    if (!defaultCounty) return

    setFilters((prev) => {
      if (prev.county) return prev
      return {
        county: defaultCounty,
        subcounty: "",
        ward: "",
      }
    })
  }, [defaultCounty])

  const results: ServicePoint[] = (data as ServicePointsResponse)?.results ?? []
  const hasData = results.length > 0

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Service Points
            </CardTitle>
            <CardDescription>
              Service points grouped by county
              {filters.county && (
                <span className="ml-1">
                  in <Badge variant="outline">{filters.county}</Badge>
                </span>
              )}
            </CardDescription>
          </div>

          {/* Filter Section - Always visible */}
          <Card className="mt-4 p-4">
            <AdminUnitFilter
              onFilterChange={handleFilterChange}
              defaultCounty={defaultCounty}
              defaultSubCounty=""
              defaultWard=""
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
                Loading service points data...
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
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Service Points
          </CardTitle>
          <CardDescription>
            Service points grouped by county
            {filters.county && (
              <span className="ml-1">
                in <Badge variant="outline">{filters.county}</Badge>
              </span>
            )}
          </CardDescription>
        </div>

        {/* Filter Section - Always visible */}
        <Card className="mt-4 p-4">
          <AdminUnitFilter
            onFilterChange={handleFilterChange}
            defaultCounty={defaultCounty}
            defaultSubCounty=""
            defaultWard=""
            userRole={user?.role}
          />
        </Card>
      </CardHeader>
      <CardContent>
        {/* Show message when no county is selected */}
        {!filters.county ? (
          <div className="flex min-h-100 flex-col items-center justify-center text-muted-foreground">
            <Leaf className="mb-4 h-16 w-16 opacity-50" />
            <p className="text-lg font-bold">Select County</p>
            <p className="mt-1 max-w-md text-center text-sm opacity-80">
              Please select a county from the filter above to view service
              points data.
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Error loading service points data
          </div>
        ) : !hasData ? (
          <div className="text-center text-muted-foreground">
            No service points found
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Total Counties</span>
                </div>
                <div className="text-lg font-bold">
                  {formatNumber(results.length)}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Total Service Points</span>
                </div>
                <div className="text-lg font-bold">
                  {formatNumber(
                    results.reduce(
                      (sum, item) => sum + item.service_points.length,
                      0
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>County</TableHead>
                    <TableHead>Service Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="align-top font-medium">
                        <Badge variant="outline">{item.county}</Badge>
                      </TableCell>
                      <TableCell>
                        <ol className="list-inside space-y-1">
                          {item.service_points.map((servicePoint, spIndex) => (
                            <li key={spIndex} className="text-sm">
                              {servicePoint}
                            </li>
                          ))}
                        </ol>
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
