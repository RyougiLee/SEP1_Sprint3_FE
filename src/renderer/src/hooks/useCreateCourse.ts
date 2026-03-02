import {useMutation} from "@tanstack/react-query";
import {CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: async (formData: any) => await CourseAPI.create(formData),
    onSuccess: (res:any) => {
      console.log("Create new course success")
  },
    onError: (error) => {
      console.error("Create failed", error)
    }
  })
}