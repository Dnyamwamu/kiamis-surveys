import {
  ROLES,
  canManageUsers,
  canManageZones,
  getRoleBadgeColor,
  getRoleName,
  isNationalRole,
} from "./roles"

describe("roles helpers", () => {
  it("identifies national roles from numeric id", () => {
    expect(isNationalRole(ROLES.NATIONAL_ICT)).toBe(true)
    expect(isNationalRole(ROLES.COUNTY_AGRICULTURAL_OFFICER)).toBe(false)
  })

  it("identifies national roles from string id", () => {
    expect(isNationalRole(String(ROLES.NATIONAL_AGRICULTURAL_OFFICER))).toBe(
      true
    )
  })

  it("returns false for invalid or missing role ids", () => {
    expect(isNationalRole(undefined)).toBe(false)
    expect(isNationalRole("invalid")).toBe(false)
    expect(canManageUsers(undefined)).toBe(false)
    expect(canManageZones(undefined)).toBe(false)
  })

  it("checks user and zone management permissions", () => {
    expect(canManageUsers(ROLES.SYSTEM_ADMIN)).toBe(true)
    expect(canManageUsers(ROLES.COUNTY_AGRICULTURAL_OFFICER)).toBe(false)
    expect(canManageZones(ROLES.WARD_AGRICULTURAL_OFFICER)).toBe(true)
    expect(canManageZones(ROLES.NATIONAL_ICT)).toBe(true)
  })

  it("returns readable role names", () => {
    expect(getRoleName(ROLES.COUNTY_ICT)).toBe("County Admin")
    expect(getRoleName("3")).toBe("Ward Officer")
    expect(getRoleName(undefined)).toBe("Unknown Role")
    expect(getRoleName(999)).toBe("Unknown Role")
  })

  it("returns badge color classes for roles", () => {
    expect(getRoleBadgeColor(ROLES.SYSTEM_ADMIN)).toContain("bg-red-500/10")
    expect(getRoleBadgeColor(ROLES.WARD_AGRICULTURAL_OFFICER)).toContain(
      "bg-emerald-500/10"
    )
    expect(getRoleBadgeColor(999)).toContain("bg-gray-500/10")
    expect(getRoleBadgeColor(undefined)).toContain("bg-gray-500/10")
  })
})
