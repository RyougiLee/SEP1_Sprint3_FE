import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const usePublishAssignment = () => {
  return useMutation({
    mutationFn: async (id: any) => await AssignmentsApi.publish(id),
    onSuccess: (res:any) => {
      console.log("Publish assignment success")
    },
    onError: (error) => {
      console.error("Publish assignment failed", error)
    }
  })
}