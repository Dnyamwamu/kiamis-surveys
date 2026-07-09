"use client"

import React, { useState } from "react"
import { useGetRedeemedEvouchersQuery } from "@/lib/features/api/fertilizer/fertilizerApi"
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
import { Loader2, Users, DollarSign, ArrowLeft, Leaf } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { AdminUnitFilter } from "../admin-unit-filter"
import { Input } from "@/components/ui/input"
import { RedeemedEvouchers } from "@/types/fertilizer"
import { RedeemedEvouchersResponse } from "@/types/fertilizer"

export function FarmersCard() {
  const { user } = useAuth()
  const isAdminUser = user?.role === "ADMIN" || user?.role === "SUPERADMIN"
  const defaultCounty = isAdminUser
    ? ""
    : user?.county?.name || user?.profile?.county || ""

  const [filters, setFilters] = React.useState({
    county: defaultCounty,
    subcounty: "",
    ward: "",
    user_mobile_number: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useGetRedeemedEvouchersQuery(
    {
      county: filters.county,
      page: currentPage,
      page_size: 50,
      user_mobile_number: filters.user_mobile_number,
    },
    {
      skip: !filters.county,
    }
  )

  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null)
  const [showAdvice, setShowAdvice] = useState(false)

  const handleMobileNumberChange = (value: string) => {
    setFilters((prev) => ({ ...prev, user_mobile_number: value }))
    setCurrentPage(1)
  }

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
        user_mobile_number: "",
      }
    })
  }, [defaultCounty])

  const results: RedeemedEvouchers[] =
    (data as RedeemedEvouchersResponse)?.results ?? []
  const hasData = results.length > 0
  const totalPages = (data as RedeemedEvouchersResponse)?.total_pages ?? 1

  const totalTransactionValue = results.reduce(
    (sum, item) => sum + item.transaction_value,
    0
  )
  const totalPaymentAmount = results.reduce(
    (sum, item) => sum + item.payment_amount,
    0
  )

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Redeemed eVouchers
            </CardTitle>
            <CardDescription>
              Individual farmer redemption records
              {filters.county && (
                <span className="ml-1">
                  in <Badge variant="outline">{filters.county}</Badge>
                </span>
              )}
            </CardDescription>
          </div>

          {/* Filter Section - Always visible */}
          <Card className="mt-4 p-4">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                Search by User Mobile Number
              </label>
              <Input
                type="tel"
                placeholder="Enter mobile number..."
                value={filters.user_mobile_number}
                onChange={(e) => handleMobileNumberChange(e.target.value)}
              />
            </div>
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
                Loading farmer records...
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
            Redeemed eVouchers
          </CardTitle>
          <CardDescription>
            Individual farmer redemption records
            {filters.county && (
              <span className="ml-1">
                in <Badge variant="outline">{filters.county}</Badge>
              </span>
            )}
          </CardDescription>
        </div>

        {/* Filter Section - Always visible */}
        <Card className="mt-4 p-4">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Search by User Mobile Number
            </label>
            <Input
              type="tel"
              placeholder="Enter mobile number..."
              value={filters.user_mobile_number}
              onChange={(e) => handleMobileNumberChange(e.target.value)}
            />
          </div>
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
              Please select a county from the filter above to view farmer
              redemption data.
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            Error loading farmer data
          </div>
        ) : !hasData ? (
          <div className="text-center text-muted-foreground">
            No redemption records found
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Total Records</span>
                </div>
                <div className="text-lg font-bold">
                  {formatNumber(
                    (data as RedeemedEvouchersResponse)?.count ?? 0
                  )}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Total Value</span>
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalTransactionValue)}
                </div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Payment Amount</span>
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalPaymentAmount)}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Voucher Code</TableHead>
                    <TableHead>Farmer Name</TableHead>
                    <TableHead>Farmer Phone</TableHead>
                    <TableHead>National ID</TableHead>
                    <TableHead>Value Chain</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">
                      Transaction Value
                    </TableHead>
                    <TableHead className="text-right">Payment</TableHead>
                    <TableHead>Service Point</TableHead>
                    <TableHead>Date Redeemed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item, index) => (
                    <TableRow key={item._id_}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-mono font-medium">
                        <Badge variant="outline">{item.voucher_code}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.farmer_name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.formatted_farmer_mobile}
                      </TableCell>
                      <TableCell className="font-mono">
                        {item.national_id_no}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.value_chain}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item.transaction_quantity)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.transaction_value)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.payment_amount)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.service_point_name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(item.date_redeemed).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Info */}
            {(data as RedeemedEvouchersResponse) && (
              <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                <div>
                  Page {(data as RedeemedEvouchersResponse).current_page} of{" "}
                  {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(page + 1, totalPages))
                    }
                  >
                    Next
                  </Button>
                </div>
                <div>
                  Total Records:{" "}
                  {formatNumber((data as RedeemedEvouchersResponse).count)}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
