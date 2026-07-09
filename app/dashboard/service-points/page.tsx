import { StoreIcon } from "lucide-react"
import { ServicePointsCard } from "@/components/dashboard/ServicePointsCard"

export default function ServicePointsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <StoreIcon className="h-6 w-6 text-emerald-600" />
            Service Points
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Service Points by County{" "}
          </p>
        </div>
      </div>

      {/* Redemption by Service Points */}
      <ServicePointsCard />
    </div>
  )
}
