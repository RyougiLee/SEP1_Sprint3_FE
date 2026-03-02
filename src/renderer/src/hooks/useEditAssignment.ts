import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useEditAssignment = () => {
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: any }) => await AssignmentsApi.modify(id, formData),
    onSuccess: (res:any) => {
      console.log("Edit assignment success")
    },
    onError: (error) => {
      console.error("Edit failed", error)
    }
  })
}