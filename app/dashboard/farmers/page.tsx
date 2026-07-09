import { LeafIcon } from "lucide-react"

import { RedemptionByValuchainsCard } from "@/components/dashboard/RedemptionByValuchainsCard"
import { FarmersCard } from "@/components/dashboard/FarmersCard"

export default function FarmersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <LeafIcon className="h-6 w-6 text-emerald-600" />
            Farmers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Farmers Redemption Statistics{" "}
          </p>
        </div>
      </div>

      {/* Redemption by Value Chains */}
      <FarmersCard />
    </div>
  )
}
