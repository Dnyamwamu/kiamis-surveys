"use client";

import type React from "react";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
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
  );
}
