import {useMutation} from "@tanstack/react-query";
import {CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useArchiveCourse = () => {
  return useMutation({
    mutationFn: async (id: string) => await CourseAPI.archive(id),
    onSuccess: (res:any) => {
      console.log("Archive course success")
    },
    onError: (error) => {
      console.error("Archive course failed", error)
    }
  })
}