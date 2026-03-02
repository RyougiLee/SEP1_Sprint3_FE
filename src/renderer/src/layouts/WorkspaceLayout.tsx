import React, {useEffect} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {useTitleStore, useUserStore} from "@/store";

export function WorkspaceLayout() {
  const { courseId } = useParams()
  const {data, isLoading} : { data: any, isLoading: boolean } = useGetCourseDetails(courseId);
  // const{setTitle} = useTitle();
  const setTitle = useTitleStore((state)=>state.setTitle)
  const navigate = useNavigate()
  const userDetail = useUserStore((state) => state.user);

  const isOverview = location.pathname.endsWith(`${courseId}`);
  const isAssignments = location.pathname.includes("/assignments");
  const isManagement = location.pathname.includes("/management");

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
            <Button
                variant={isOverview ? "default" : "outline"}
                onClick={() => navigate(`/workspaces/${courseId}`)}
            >
              Overview
            </Button>
            <Button
                variant={isAssignments ? "default" : "outline"}
                onClick={() => navigate(`/workspaces/${courseId}/assignments`)}
            >
              Assignments
            </Button>
            {userDetail?.role === "TEACHER" && (
                <Button
                    variant={isManagement ? "default" : "outline"}
                    onClick={() => navigate(`/workspaces/${courseId}/management`)}
                >
                  Management
                </Button>
            )}
          </ButtonGroup>
          <Outlet />
        </div>
      </div>
  )
}