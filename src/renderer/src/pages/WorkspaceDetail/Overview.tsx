import React from "react";
import {useParams} from "react-router-dom";
import {useGetCourseDetails} from "@/hooks/useGetCourseDetails";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function WorkspaceOverview (){

  const { courseId } = useParams()
  const {data, isLoading} : { data: any, isLoading: boolean } = useGetCourseDetails(courseId);

  if (isLoading){
    return <div>Loading</div>
  }
  return(
      <div>
        <Card className="mt-[20px]">
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>{data.code}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Course ID</p>
              <p className="font-medium">{data.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant={data.archived ? "secondary" : "default"}>
                {data.archived ? "Archived" : "Active"}
              </Badge>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Created By</p>
              <p className="font-medium">{data.createdByUsername}</p>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}