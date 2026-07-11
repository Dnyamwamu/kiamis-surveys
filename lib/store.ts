import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./features/api/auth/authApi"
import authReducer from "./features/api/auth/authSlice"
import { surveysApi } from "./features/api/surveys/surveysApi"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [surveysApi.reducerPath]: surveysApi.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, surveysApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
