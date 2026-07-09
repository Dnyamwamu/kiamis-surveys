/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState, LoginResponse } from "../../../../types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  sessionStart: null,
  isLoading: false,
  error: undefined,
};

/* --------------------------- Helper Functions ---------------------------- */

export const isUserAuthorized = (role: string): boolean => {
  return ["SUPERADMIN", "ADMIN", "REVIEWER", "NATIONAL USER"].includes(role);
};

export const getUserRole = (
  role: string
): "SUPERADMIN" | "ADMIN" | "REVIEWER" | "NATIONAL USER" | null => {
  if (role === "SUPERADMIN") return "SUPERADMIN";
  if (role === "ADMIN") return "ADMIN";
  if (role === "REVIEWER") return "REVIEWER";
  if (role === "NATIONAL USER") return "NATIONAL USER";
  return null;
};

export const canAccessProject = (
  user: User | null,
  project: string
): boolean => {
  if (!user) return false;
  const userRole = getUserRole(user.role);

  // SUPERADMIN can access all projects
  if (userRole === "SUPERADMIN") return true;
  if (userRole === "NATIONAL USER") return true;

  // ADMIN and REVIEWER can only access their assigned project
  if (userRole === "ADMIN" || userRole === "REVIEWER") {
    return user.county?.project === project;
  }

  return false;
};

export const isNationalUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === "NATIONAL USER" || user.role === "ADMIN";
};

export const isCountyUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === "REVIEWER";
};

export const isSuperAdmin = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === "SUPERADMIN";
};

export const getUserCounty = (user: User | null): string | null => {
  if (!user || !user.county) return null;
  return user.county.name;
};

/* ------------------------------ Selectors -------------------------------- */

export const checkIsSuperAdmin = (state: { auth: AuthState }): boolean => {
  return isSuperAdmin(state.auth.user);
};

export const checkIsNationalUser = (state: { auth: AuthState }): boolean => {
  return isNationalUser(state.auth.user);
};

export const checkIsCountyUser = (state: { auth: AuthState }): boolean => {
  return isCountyUser(state.auth.user);
};

export const getUserProject = (state: { auth: AuthState }): string | null => {
  if (!state.auth.user || !state.auth.user.county) return null;
  return state.auth.user.county.project;
};

/* -------------------------------- Slice ---------------------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<LoginResponse | { user: User; token: string }>
    ) => {
      // Support both structure variants
      const payload = action.payload as any;
      const user = payload.user || payload.data?.user;
      const token = payload.token || payload.access || payload.access_token || payload.key || payload.auth_token || payload.data?.access;
      const refreshToken = payload.refresh || payload.refresh_token;

      state.isAuthenticated = !!token;
      state.user = user || null;
      state.token = token || null;
      state.refreshToken = refreshToken || null;
      state.sessionStart = Date.now();
      state.isLoading = false;
      state.error = null;

      if (typeof window !== "undefined" && token) {
        // Note: localStorage persistence is handled by authPersistenceMiddleware
        // Only set cookies for additional persistence layer
        
        const isProduction = window.location.hostname === "vaccination.kalro.org";
        const isSecure = window.location.protocol === "https:";
        const cookieOptions = [
          `auth_token=${token}`,
          "path=/",
          `max-age=${7 * 24 * 60 * 60}`,
          isSecure ? "Secure" : "",
          "SameSite=Lax",
          isProduction ? "domain=.kalro.org" : "",
        ].filter(Boolean).join("; ");

        document.cookie = cookieOptions;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.sessionStart = null;
      state.isLoading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        // Note: localStorage clearing is handled by authPersistenceMiddleware
        // Only clear cookies
        
        const isProduction = window.location.hostname === "vaccination.kalro.org";
        const cookieOptions = [
          "auth_token=",
          "path=/",
          "expires=Thu, 01 Jan 1970 00:00:00 GMT",
          "SameSite=Lax",
          isProduction ? "domain=.kalro.org" : "",
        ].filter(Boolean).join("; ");

        document.cookie = cookieOptions;
      }
    },
    restoreAuth: (
      state,
      action: PayloadAction<{ token: string; user: User | null }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.sessionStart = Date.now(); // Set current time as session start
    },
    updateToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken?: string }>
    ) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    hydrateAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { 
  setCredentials, 
  logout, 
  restoreAuth, 
  updateToken, 
  setLoading, 
  setError, 
  hydrateAuth 
} = authSlice.actions;

export default authSlice.reducer;
