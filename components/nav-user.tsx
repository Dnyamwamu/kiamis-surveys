"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

/* ================= ROLE MAP ================= */
const ROLE_LABELS: Record<number, string> = {
  1: "County Officer",
  2: "Sub-County Officer",
  3: "Ward Officer",
  4: "National Agricultural Officer",
  5: "National ICT",
  6: "System Admin",
  7: "County Admin",
};

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuth();

  if (!user) return null;

  /* ================= FALLBACKS ================= */
  const firstName = user.first_name || "User";
  const lastName = user.last_name || "";
  const email = user.email || "no-email@system";

  // Use the new structure first, then fallback to ROLE_LABELS if it's a number from profile
  const roleLabel =
    user.role ||
    (typeof user.profile?.role === "number"
      ? ROLE_LABELS[user.profile.role]
      : user.profile?.role) ||
    "Unknown Role";

  const isAdmin = user.role === "ADMIN";
  const isSuperAdmin = user.role === "SUPERADMIN";
  const county = user.county?.name || user.profile?.county || "N/A";
  const projectLabel = isSuperAdmin
    ? "All user projects (NAVCDP & FSRP)"
    : user.county?.project || "N/A";
  const shouldShowCounty = !isAdmin && !isSuperAdmin;
  const phone = user.phone || user.profile?.mobile_number || "N/A";

  const userInitials =
    `${firstName[0] || "U"}${lastName[0] || ""}`.toUpperCase();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              {/* ===== SIDEBAR USER INFO ===== */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-xs font-medium text-primary">
                  {roleLabel}
                </span>
                <span className="truncate font-semibold">
                  {firstName} {lastName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* ===== DROPDOWN HEADER ===== */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xs font-medium text-primary">
                    {roleLabel}
                  </span>
                  <span className="truncate font-semibold">
                    {firstName} {lastName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* ===== ROLE & LOCATION ===== */}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Role & Location
            </DropdownMenuLabel>

            <div className="px-2 py-1.5 text-xs text-muted-foreground space-y-1">
              <div>
                <span className="font-medium">Role:</span> {roleLabel}
              </div>
                <div>
                  <span className="font-medium">Project:</span> {projectLabel}
                </div>
                {shouldShowCounty && (
                  <div>
                    <span className="font-medium">County:</span> {county}
                  </div>
                )}

                <div>
                  <span className="font-medium">Phone:</span> {phone}
                </div>
              </div>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
