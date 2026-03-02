import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useModifyCourse = () => {
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: any }) => await CourseAPI.modify(id, formData),
    onSuccess: (res:any) => {
      console.log("Edit course success")
    },
    onError: (error) => {
      console.error("Edit course failed", error)
    }
  })
}