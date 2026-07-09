// Role configuration for the KIAMIS system
export const ROLES = {
  COUNTY_AGRICULTURAL_OFFICER: 1,
  // SUBCOUNTY_AGRICULTURAL_OFFICER: 2,
  WARD_AGRICULTURAL_OFFICER: 3,
  NATIONAL_AGRICULTURAL_OFFICER: 4,
  NATIONAL_ICT: 5,
  SYSTEM_ADMIN: 6,
  COUNTY_ICT: 7,
} as const;

export const ROLE_NAMES: Record<number, string> = {
  1: "County Officer",
  // 2: "SubCounty Officer",
  3: "Ward Officer",
  4: "National Admin",
  5: "National ICT",
  6: "System Admin",
  7: "County Admin",
};

// Roles that can manage users (add, edit, delete)
export const USER_MANAGEMENT_ROLES: number[] = [
  ROLES.NATIONAL_ICT,
  ROLES.COUNTY_ICT,
  ROLES.SYSTEM_ADMIN,
  ROLES.NATIONAL_AGRICULTURAL_OFFICER,
];  

// Roles that can manage zones (assign, revoke)
export const ZONE_MANAGEMENT_ROLES: number[] = [
  ROLES.SYSTEM_ADMIN,
  ROLES.NATIONAL_ICT,
  ROLES.COUNTY_ICT,
  ROLES.COUNTY_AGRICULTURAL_OFFICER,
  ROLES.WARD_AGRICULTURAL_OFFICER,
  ROLES.NATIONAL_AGRICULTURAL_OFFICER,
];

// Roles that are at the national level (don't require a county/subcounty/ward)
export const NATIONAL_ROLES: number[] = [
  ROLES.SYSTEM_ADMIN,
  ROLES.NATIONAL_ICT,
  ROLES.NATIONAL_AGRICULTURAL_OFFICER,
];

// Helper function to check if a role is national level
export function isNationalRole(roleId: number | string | undefined): boolean {
  if (!roleId) return false;
  const numericRoleId = typeof roleId === "string" ? parseInt(roleId, 10) : roleId;
  return NATIONAL_ROLES.includes(numericRoleId);
}

// Helper function to check if a role can manage users
export function canManageUsers(roleId: number | undefined): boolean {
  if (!roleId) return false;
  return USER_MANAGEMENT_ROLES.includes(roleId);
}

// Helper function to check if a role can manage zones
export function canManageZones(roleId: number | undefined): boolean {
  if (!roleId) return false;
  return ZONE_MANAGEMENT_ROLES.includes(roleId);
}

// Helper function to get role name
export function getRoleName(roleId: number | string | undefined): string {
  if (roleId === undefined || roleId === null) return "Unknown Role";
  const numericRoleId =
    typeof roleId === "string" ? parseInt(roleId, 10) : roleId;
  return ROLE_NAMES[numericRoleId] || "Unknown Role";
}

// Helper function to get role badge color
export function getRoleBadgeColor(roleId: number | string | undefined): string {
  if (roleId === undefined) return "bg-gray-500/10 text-gray-600 border-gray-500/20";

  const numericRoleId = typeof roleId === "string" ? parseInt(roleId, 10) : roleId;

  switch (numericRoleId) {
    case ROLES.SYSTEM_ADMIN:
      return "bg-red-500/10 text-red-700 border-red-200 hover:bg-red-500/20";
    case ROLES.NATIONAL_ICT:
      return "bg-indigo-500/10 text-indigo-700 border-indigo-200 hover:bg-indigo-500/20";
    case ROLES.NATIONAL_AGRICULTURAL_OFFICER:
      return "bg-slate-500/10 text-slate-700 border-slate-200 hover:bg-slate-500/20";
    case ROLES.COUNTY_ICT: // County Admin
      return "bg-amber-500/10 text-amber-700 border-amber-200 hover:bg-amber-500/20";
    case ROLES.COUNTY_AGRICULTURAL_OFFICER: // County Officer
      return "bg-blue-500/10 text-blue-700 border-blue-200 hover:bg-blue-500/20";
    case ROLES.WARD_AGRICULTURAL_OFFICER: // Ward Officer
      return "bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/20";
    default:
      return "bg-gray-500/10 text-gray-700 border-gray-200 hover:bg-gray-500/20";
  }
}
