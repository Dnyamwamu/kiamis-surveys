"use client";

import { MapPin } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";

export function HeaderCounty() {
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPERADMIN";
  const projectLabel = isSuperAdmin
    ? "All user projects (NAVCDP & FSRP)"
    : user?.county?.project || "N/A";
  const county = user?.county?.name || user?.profile?.county || "All Counties";
  const displayLabel = isAdmin || isSuperAdmin ? projectLabel : county;

  return (
    <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
      <MapPin className="size-4" />
      <span>{displayLabel}</span>
    </div>
  );
}
