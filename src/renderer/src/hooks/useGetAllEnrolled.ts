import {useQuery} from "@tanstack/react-query";
import {CourseAPI} from "@/utils/api";

export const useGetAllEnrolled = (courseId: string) => {
  return useQuery({
    queryKey: ['get-student-enrolled', courseId],
    queryFn: async () => await CourseAPI.getEnrolled(courseId),
  })
}