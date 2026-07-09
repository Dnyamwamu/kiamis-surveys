"use client";

import React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Moon, ServerCog, Sun } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { HeaderUser } from "@/components/header-user";
import { HeaderCounty } from "@/components/header-county";
import { AuthGuard } from "@/components/auth-guard";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(segment => segment !== "");

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    // Format label: capitalize and replace dashes/underscores with spaces
    const label = segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    const isLast = index === pathSegments.length - 1;

    return { href, label, isLast };
  });

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="max-w-full overflow-x-hidden">
          <header className="relative flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/main-dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbs.length > 0 && breadcrumbs[0].label !== 'Main Dashboard' && (
                    <BreadcrumbSeparator>
                      <ChevronRight />
                    </BreadcrumbSeparator>
                  )}
                  {breadcrumbs.map((crumb, index) => {
                    // Skip 'Main Dashboard' if it's the first segment to avoid 'Dashboard / Main Dashboard'
                    if (index === 0 && crumb.label === 'Main Dashboard') return null;

                    return (
                      <React.Fragment key={crumb.href}>
                        <BreadcrumbItem>
                          {crumb.isLast ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link href={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!crumb.isLast && (
                          <BreadcrumbSeparator>
                            <ChevronRight />
                          </BreadcrumbSeparator>
                        )}
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex bg-red-100 text-red-500 p-2 text-center text-xs font-semibold rounded-full shadow-sm px-4 border border-red-200 items-center animate-pulse">
              <ServerCog className="mr-2 h-4 w-4" /> 
              <span>Training Server...</span>
            </div> */}

            <div className="flex items-center gap-2">

              <HeaderCounty />
              <ThemeToggle />
              <HeaderUser />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-full">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
