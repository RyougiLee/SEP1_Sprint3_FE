import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useEnrollUser = () => {
  return useMutation({
    mutationFn: async ({ courseId, userId }: { courseId: string; userId: string }) => await CourseAPI.enroll(courseId, userId),
    onSuccess: (res:any) => {
      console.log("Enroll student success")
    },
    onError: (error) => {
      console.error("Enroll student failed", error)
    }
  })
}