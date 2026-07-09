"use client"

import type { AppStore } from "@/lib/store"
import { makeStore } from "@/lib/store"
import { setupListeners } from "@reduxjs/toolkit/query"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from "@/components/theme-provider"

interface Props {
  readonly children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
  const [store] = useState(() => makeStore())

  useEffect(() => {
    // configure listeners using the provided defaults
    // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
    const unsubscribe = setupListeners(store.dispatch)
    return unsubscribe
  }, [store])
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  )
}
