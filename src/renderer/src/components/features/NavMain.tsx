"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import { Link } from "react-router-dom"

export function NavMain({items,}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {items.map((item) => (
                <Link to={item.url} key={item.title}>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
  )
}
