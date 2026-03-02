import {useQuery} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI} from "@/utils/api";

export const useGetAllAssignments = () => {
  return useQuery({
    queryKey: ['get-all-assignments'],
    queryFn: async () => await AssignmentsApi.getAll(),
  })
}