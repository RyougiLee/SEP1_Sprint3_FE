import {useQuery} from "@tanstack/react-query";
import {CourseAPI} from "@/utils/api";

export const useGetAssignmentsInCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['get-course-assignments', courseId],
    queryFn: async () => await CourseAPI.getAssignments(courseId),
  })
}