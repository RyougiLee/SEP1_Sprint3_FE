import React from "react"
import {Outlet} from "react-router-dom";
import { Label } from "@/components/ui/label"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {RootSidebar} from "@/layouts/RootSidebar";
import {TitleBar} from "@/components/features/TittleBar";

const MainLayout = () =>{
  return(
      <div className="w-full">
        <div className="flex">
          <div>
            <SidebarProvider className="min-h-10">
              <RootSidebar />
            </SidebarProvider>
          </div>
          <div className="w-full">
            <TitleBar/>
            <Outlet/>
          </div>
        </div>
      </div>
  )
}
export default MainLayout