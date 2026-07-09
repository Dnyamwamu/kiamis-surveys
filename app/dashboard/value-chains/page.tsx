import { LeafIcon } from "lucide-react";

import { RedemptionByValuchainsCard } from "@/components/dashboard/RedemptionByValuchainsCard";

export default function ValuechainsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <LeafIcon className="w-6 h-6 text-emerald-600" />
            Value Chains
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Value Chains Redemption Statistics{" "}
          </p>
        </div>
      </div>

      {/* Redemption by Value Chains */}
      <RedemptionByValuchainsCard />
    </div>
  );
}
