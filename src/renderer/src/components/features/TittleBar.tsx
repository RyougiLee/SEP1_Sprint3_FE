import {Label} from "@/components/ui/label";
import React from "react";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import {useTitleStore} from "@/store";

export function TitleBar(){

  // const { title } = useTitle();
  const title = useTitleStore((state)=>state.title)
  return(
      <div>
        <div className="h-[64px] px-[20px] w-full flex items-center">
          <div className="w-auto h-full flex items-center">
            <ButtonGroup className="hidden sm:flex">
              <Button variant="outline" size="icon-sm" aria-label="Go Back">
                <ArrowLeftIcon />
              </Button>
            </ButtonGroup>
            <Label className="ml-[16px] text-[16px]">{title}</Label>
          </div>
          <div className="flex-grow drag-zone h-full"></div>
        </div>
      </div>
  )
}