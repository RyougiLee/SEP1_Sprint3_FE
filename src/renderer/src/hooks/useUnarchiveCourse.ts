import {useMutation} from "@tanstack/react-query";
import {CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useUnarchiveCourse = () => {
  return useMutation({
    mutationFn: async (id: string) => await CourseAPI.unarchive(id),
    onSuccess: (res:any) => {
      console.log("Unarchive course success")
    },
    onError: (error) => {
      console.error("Unarchive course failed", error)
    }
  })
}