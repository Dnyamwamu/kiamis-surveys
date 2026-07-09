import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer, { hydrateAuth } from "./features/api/auth/authSlice";
import { authPersistenceMiddleware, hydrateAuthState } from "./features/api/auth/authMiddleware";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export const makeStore = () => {
  const store = configureStore({
  reducer: rootReducer,
   // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        apiSlice.middleware,
        authPersistenceMiddleware,
      );
    },
  });

  // Hydrate auth state immediately on store creation (client-side only)
  if (typeof window !== "undefined") {
    const hydratedState = hydrateAuthState();
    if (hydratedState) {
      store.dispatch(hydrateAuth(hydratedState));
    }
  }

  return store;
};
export const store = makeStore();

// Remove the separate hydration call since it's now done in makeStore
// if (typeof window !== "undefined") {
//   const hydratedState = hydrateAuthState();
//   if (hydratedState) {
//     store.dispatch({ type: "auth/hydrateAuth", payload: hydratedState });
//   }
// }

export type RootState = ReturnType<typeof rootReducer>;
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;