import {useQuery} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI} from "@/utils/api";

export const useGetUrgentAssignments = () => {
  return useQuery({
    queryKey: ['get-urgent-assignments'],
    queryFn: async () => await AssignmentsApi.getUrgent(),
  })
}