/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import type React from "react"
import {
  LayoutDashboard,
  Users,
  LogOut,
  Tractor,
  Settings,
  FileText,
  Beef,
  Syringe,
  Leaf,
  Store,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavCounty } from "@/components/nav-county"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ROLES } from "@/lib/config/roles"

interface NavItem {
  title: string
  url: string
  icon: any
  badge?: number | string
  items?: {
    title: string
    url: string
  }[]
}

const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Farmers",
      url: "/dashboard/farmers",
      icon: Users,
    },
    {
      title: "Value Chains",
      url: "/dashboard/value-chains",
      icon: Leaf,
    },
    {
      title: "Service Points",
      url: "/dashboard/service-points",
      icon: Store,
    },
  ],
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems: NavItem[] = data.navMain.map((item) => {
    return item
  })

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="mt-4 h-auto py-2">
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Tractor className="size-5" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-left text-sm leading-tight">
                    <span className="text-xl font-bold tracking-tight uppercase">
                      E-Subsidy
                    </span>
                    <span className="text-[14px] leading-none font-medium whitespace-normal text-muted-foreground">
                      National E-Subsidy <br /> Fertilizer Dashboard
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavCounty />
          <NavMain items={navItems} />
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="px-2 pb-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </Button>
              </div>
              <div className="px-4 py-2 text-center">
                <Link href="https://kilimo.go.ke/airc/">
                  <span className="mb-2 text-xs text-muted-foreground">
                    Powered by <br />
                    <span className="font-semibold text-primary">
                      Kenya Agriculture Data and Information Centre (KADIC) -
                      MoALD
                    </span>
                  </span>
                </Link>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
