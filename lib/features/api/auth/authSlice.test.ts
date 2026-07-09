import {
  canAccessProject,
  checkIsCountyUser,
  checkIsNationalUser,
  checkIsSuperAdmin,
  getUserCounty,
  getUserProject,
  getUserRole,
  isCountyUser,
  isNationalUser,
  isSuperAdmin,
  isUserAuthorized,
} from "./authSlice"
import type { AuthState, User } from "../../../../types/auth"

describe("auth helper functions", () => {
  const nationalUser: User = {
    id: 1,
    email: "national@example.com",
    first_name: "National",
    last_name: "User",
    phone: "1234567890",
    role: "NATIONAL USER",
    has_agreed_to_terms: true,
    county: { id: 1, name: "Nairobi", project: "proj123" },
    subcounty: { id: null, name: null },
    ward: { id: null, name: null },
    fpo: { id: null, name: null },
  }

  const adminUser: User = {
    id: 2,
    email: "admin@example.com",
    first_name: "Admin",
    last_name: "User",
    phone: "1234567891",
    role: "ADMIN",
    has_agreed_to_terms: true,
    county: { id: 2, name: "Kisumu", project: "proj123" },
    subcounty: { id: null, name: null },
    ward: { id: null, name: null },
    fpo: { id: null, name: null },
  }

  const reviewerUser: User = {
    id: 3,
    email: "reviewer@example.com",
    first_name: "Reviewer",
    last_name: "User",
    phone: "1234567892",
    role: "REVIEWER",
    has_agreed_to_terms: true,
    county: { id: 3, name: "Mombasa", project: "proj999" },
    subcounty: { id: null, name: null },
    ward: { id: null, name: null },
    fpo: { id: null, name: null },
  }

  const superAdminUser: User = {
    id: 4,
    email: "superadmin@example.com",
    first_name: "Super",
    last_name: "Admin",
    phone: "1234567893",
    role: "SUPERADMIN",
    has_agreed_to_terms: true,
    county: null,
    subcounty: { id: null, name: null },
    ward: { id: null, name: null },
    fpo: { id: null, name: null },
  }

  const createState = (user: User | null): { auth: AuthState } => ({
    auth: {
      user,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      sessionStart: null,
    },
  })

  it("validates authorized roles", () => {
    expect(isUserAuthorized("SUPERADMIN")).toBe(true)
    expect(isUserAuthorized("NATIONAL USER")).toBe(true)
    expect(isUserAuthorized("GUEST")).toBe(false)
  })

  it("returns correct user role values", () => {
    expect(getUserRole("ADMIN")).toBe("ADMIN")
    expect(getUserRole("INVALID")).toBeNull()
  })

  it("allows superadmin and national users access to any project", () => {
    expect(canAccessProject(superAdminUser, "anyProj")).toBe(true)
    expect(canAccessProject(nationalUser, "anyProj")).toBe(true)
  })

  it("restricts admin and reviewer to their assigned project", () => {
    expect(canAccessProject(adminUser, "proj123")).toBe(true)
    expect(canAccessProject(adminUser, "other")).toBe(false)
    expect(canAccessProject(reviewerUser, "proj999")).toBe(true)
    expect(canAccessProject(reviewerUser, "proj123")).toBe(false)
  })

  it("identifies user categories correctly", () => {
    expect(isNationalUser(nationalUser)).toBe(true)
    expect(isNationalUser(adminUser)).toBe(true)
    expect(isCountyUser(reviewerUser)).toBe(true)
    expect(isSuperAdmin(superAdminUser)).toBe(true)
    expect(isSuperAdmin(null)).toBe(false)
  })

  it("retrieves county and project values", () => {
    expect(getUserCounty(adminUser)).toBe("Kisumu")
    expect(getUserProject(createState(nationalUser))).toBe("proj123")
    expect(getUserProject(createState(null))).toBeNull()
  })

  it("selector helpers work with state shape", () => {
    expect(checkIsSuperAdmin(createState(superAdminUser))).toBe(true)
    expect(checkIsNationalUser(createState(nationalUser))).toBe(true)
    expect(checkIsCountyUser(createState(reviewerUser))).toBe(true)
  })
})
