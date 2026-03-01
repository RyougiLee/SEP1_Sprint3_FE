import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {useTitleStore} from "@/store";

export function WorkspaceLayout() {
  const { courseId } = useParams()
  const {data, isLoading} : { data: any, isLoading: boolean } = useGetCourseDetails(courseId);
  // const{setTitle} = useTitle();
  const setTitle = useTitleStore((state)=>state.setTitle)
  const navigate = useNavigate()

  useEffect(()=>{
    if (!isLoading && data) {
      console.log(data)
      setTitle(data.name);
    }
  }, [data, isLoading, setTitle]);

  return(
      <div className="w-full">
        <div className="w-full px-[20px]">
          <ButtonGroup>
            <Button variant="outline" onClick={() => navigate(`/workspaces/${courseId}`)}>Overview</Button>
            <Button variant="outline" onClick={() => navigate(`/workspaces/${courseId}/assignments`)}>Assignments</Button>
          </ButtonGroup>
          <Outlet />
        </div>
      </div>
  )
}