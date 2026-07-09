import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../lib/store";
import { 
  logout, 
  setLoading, 
  setError,
  isNationalUser,
  isCountyUser,
  isSuperAdmin,
  getUserCounty
} from "../lib/features/api/auth/authSlice";
import {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} from "../lib/features/api/auth/authApi";
import { LoginCredentials } from "../types/auth";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const authState = useSelector((state: RootState) => state.auth);
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const result = await loginMutation(credentials).unwrap();

      // The authApi will automatically dispatch setCredentials via onQueryStarted
      // Navigation is now handled by the individual login portals or calling components
      // router.push("/main-dashboard");

      return result;
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Login failed";
      dispatch(setError(errorMessage));
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      // Call logout API if available
      await logoutMutation().unwrap();
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn("API logout failed:", error);
    } finally {
      // Always clear local state
      dispatch(logout());
      router.push("/");
    }
  };

  const refreshAuthToken = async () => {
    try {
      if (!authState.refreshToken) {
        throw new Error("No refresh token available");
      }

      const result = await refreshTokenMutation(
        authState.refreshToken,
      ).unwrap();

      // The authApi will automatically dispatch updateToken via onQueryStarted
      return result;
    } catch (error) {
      // If refresh fails, logout user
      dispatch(logout());
      router.push("/");
      throw error;
    }
  };

  return {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading || isLoginLoading,
    error: authState.error,

    // Derived flags using slice helpers
    isNational: isNationalUser(authState.user),
    isCounty: isCountyUser(authState.user),
    isSuperAdmin: isSuperAdmin(authState.user),
    userCounty: getUserCounty(authState.user),

    // Actions
    login,
    logout: logoutUser,
    refreshToken: refreshAuthToken,
  };
};
