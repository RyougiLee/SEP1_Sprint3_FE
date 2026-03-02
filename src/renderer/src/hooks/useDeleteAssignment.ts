import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useDeleteAssignment = () => {
  return useMutation({
    mutationFn: async (id: any) => await AssignmentsApi.delete(id),
    onSuccess: (res:any) => {
      console.log("Delete assignment success")
    },
    onError: (error) => {
      console.error("Delete assignment failed", error)
    }
  })
}