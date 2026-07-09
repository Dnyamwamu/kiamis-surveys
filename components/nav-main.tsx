"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    badge?: number | string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;
          const isOpen = openItems[item.title] || pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <>
                  <SidebarMenuButton
                    onClick={() => toggleItem(item.title)}
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </SidebarMenuButton>
                  {isOpen && (
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  tooltip={item.title}
                >
                  <Link href={item.url} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                    {item.badge !== undefined && item.badge !== null && item.badge !== 0 && item.badge !== "0" && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
