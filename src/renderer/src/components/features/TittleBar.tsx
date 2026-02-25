import {Label} from "@/components/ui/label";
import React from "react";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react";

export function TitleBar(){
  return(
      <div className="titlebar h-[64px] px-[20px] w-full flex items-center">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeftIcon />
        </Button>
        <Label className="ml-[16px] text-[16px]">Dashboard</Label>
      </div>
  )
}