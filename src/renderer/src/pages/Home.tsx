import React, {useEffect} from "react"
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react";
import {ButtonGroup} from "@/components/ui/button-group";
import {useTitleStore} from "@/store";

const Home = () => {

  const setTitle = useTitleStore((state)=>state.setTitle)

  useEffect(()=>{
    setTitle('Dashboard')
  }, [setTitle]);
  return(
      <div>Home</div>
  )
}

export default Home