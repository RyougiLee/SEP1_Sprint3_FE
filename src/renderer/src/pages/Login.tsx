import React from "react"
import {Chromium} from "lucide-react";
import {LoginForm} from "@/components/features/LoginForm";
import {getImage} from "@/utils/service/getImage";
import {Outlet} from "react-router-dom";
import {Toaster} from "sonner";
import logoUrl from '@/assets/images/login-page-background-wallpaper.jpg'

const Login = () => {
  return (
      <div>
        <Toaster />
        <div className="drag-zone h-[32px] w-full absolute"></div>
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="#" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <Chromium className="size-4" />
                </div>
                SEP1 Project
              </a>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                {/*<LoginForm />*/}
                <Outlet/>
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden lg:block">
            <img
                src = {logoUrl}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
  )
}

export default Login