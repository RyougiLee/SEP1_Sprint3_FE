import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useUnenrollUser = () => {
  return useMutation({
    mutationFn: async ({ courseId, userId }: { courseId: string; userId: string }) => await CourseAPI.unenroll(courseId, userId),
    onSuccess: (res:any) => {
      console.log("Unenroll student success")
    },
    onError: (error) => {
      console.error("Unenroll student failed", error)
    }
  })
}