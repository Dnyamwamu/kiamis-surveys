"use client";

import { MapPin } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";

export function NavCounty() {
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";
  const isSuperAdmin = user?.role === "SUPERADMIN";
  const projectLabel = isSuperAdmin
    ? "All user projects (NAVCDP & FSRP)"
    : user?.county?.project || "N/A";
  const county = user?.county?.name || user?.profile?.county || "All Counties";
  const displayLabel = isAdmin || isSuperAdmin ? projectLabel : county;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <div className="px-4 py-2 text-sm border border-gray-200 rounded-md bg-gray-100">
          <div className="flex items-center gap-2 text-green-700">
            <MapPin className="size-4" />
            <div className="flex flex-col ">
              <span className="font-semibold ">{displayLabel}</span>
            </div>
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
