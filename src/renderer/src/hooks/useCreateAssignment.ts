import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useCreateAssignment = () => {
  return useMutation({
    mutationFn: async (formData: any) => await AssignmentsApi.create(formData),
    onSuccess: (res:any) => {
      console.log("Create assignment success")
    },
    onError: (error) => {
      console.error("Create failed", error)
    }
  })
}