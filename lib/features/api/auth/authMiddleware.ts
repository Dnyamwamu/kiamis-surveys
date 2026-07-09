import { Middleware } from "@reduxjs/toolkit";
import { AuthState } from "../../../../types/auth";

const AUTH_STORAGE_KEY = "auth";

// Persistence middleware for auth state
export const authPersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // Only persist on client-side
    if (typeof window === "undefined") {
      return result;
    }

    const state = store.getState();
    const authState: AuthState = state.auth;

    // Persist auth state to localStorage
    if (authState.isAuthenticated && authState.token) {
      try {
        const persistedData = {
          user: authState.user,
          token: authState.token,
          refreshToken: authState.refreshToken,
          isAuthenticated: authState.isAuthenticated,
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(persistedData));
      } catch (error) {
        console.warn("Failed to persist auth state:", error);
      }
    } else {
      // Clear persisted data on logout
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to clear auth state:", error);
      }
    }

    return result;
  };

// Hydration function to restore auth state from localStorage
export const hydrateAuthState = (): Partial<AuthState> | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const persistedData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (persistedData) {
      const parsed = JSON.parse(persistedData);
      // Validate the structure
      if (parsed.user && parsed.token && parsed.isAuthenticated) {
        return {
          user: parsed.user,
          token: parsed.token,
          refreshToken: parsed.refreshToken || null,
          isAuthenticated: parsed.isAuthenticated,
          isLoading: false,
          error: null,
        };
      }
    }
  } catch (error) {
    console.warn("Failed to hydrate auth state:", error);
    // Clear corrupted data
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
};
