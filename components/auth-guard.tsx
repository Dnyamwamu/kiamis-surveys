"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Mark as hydrated after first render
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    // Only redirect if we're hydrated and not loading and not authenticated
    if (isHydrated && !isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router, isHydrated]);

  // Show loading while hydrating or while auth is loading
  if (!isHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated after hydration, don't show children while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
