import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react"
import {NavMain} from "@/components/features/NavMain";

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import {NavWorkspaces} from "@/components/features/NavWorkspaces";
import {NavSecondary} from "@/components/features/NavSecondary";
import {NavUser} from "@/components/features/NavUser";
import {useSidebarData} from "@/hooks/useSidebarData";
import {Badge} from "@/components/ui/badge";
import {useAuth} from "@/hooks/useAuth";
import {useUserStore} from "@/store";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Workspaces",
      url: "/#/workspaces",
      icon: IconListDetails,
    },
    {
      title: "Calendar",
      url: "/#/calendar",
      icon: IconChartBar,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/#/settings",
      icon: IconSettings,
    },
    {
      title: "About",
      url: "/#/about",
      icon: IconHelp,
    },
  ],
}

export function RootSidebar() {

  const {navWorkspaces, navWorkspacesCreated, navUser, isLoading} = useSidebarData();
  const {user} = useAuth();
  const userDetail = useUserStore(state => state.user)

  return(
      <Sidebar className="min-h-10">
        <SidebarHeader className="mt-[24px]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <span className="text-base font-semibold">SEP1 Project</span>
                </a>
              </SidebarMenuButton>
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                {userDetail?.role === "STUDENT"?"Student":"Teacher"}
              </Badge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavWorkspaces items={navWorkspaces} isLoading={isLoading} />
          {userDetail?.role === "TEACHER"?<NavWorkspaces items={navWorkspacesCreated} isLoading={isLoading} createdByMyself={true}/>:""}
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={navUser} isLoading={isLoading}/>
        </SidebarFooter>
      </Sidebar>
  )
}