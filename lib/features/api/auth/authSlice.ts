import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "./authApi";
import { ROLES } from "@/lib/config/roles";

interface AuthState {
  user: UserData | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserData; token: string; refreshToken?: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
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
  },
});

export const { setCredentials, logout, setLoading, setError, updateToken } = authSlice.actions;

export const isNationalUser = (user: UserData | null): boolean => {
  if (!user || !user.profile) return false;
  return ([
    ROLES.SYSTEM_ADMIN,
    ROLES.NATIONAL_ICT,
    ROLES.NATIONAL_AGRICULTURAL_OFFICER,
  ] as number[]).includes(user.profile.role);
};

export const isCountyUser = (user: UserData | null): boolean => {
  if (!user || !user.profile) return false;
  return ([ROLES.COUNTY_ICT, ROLES.COUNTY_AGRICULTURAL_OFFICER] as number[]).includes(
    user.profile.role
  );
};

export const isSuperAdmin = (user: UserData | null): boolean => {
  if (!user || !user.profile) return false;
  return user.profile.role === ROLES.SYSTEM_ADMIN;
};

export const getUserCounty = (user: UserData | null): string | null => {
  if (!user || !user.profile) return null;
  return user.profile.county;
};

export default authSlice.reducer;
