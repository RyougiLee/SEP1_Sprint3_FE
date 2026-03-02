import {useMutation} from "@tanstack/react-query";
import {SubmissionApi} from "@/utils/api/modules/submission";

export const useGetSingleSubmission = () => {
  return useMutation({
    mutationFn: async (submissionId: string) => await SubmissionApi.getSingleSubmission(submissionId),
    onSuccess: (res:any) => {
      console.log("Get submission success")
    },
    onError: (error) => {
      console.error("Get submission failed", error)
    }
  })
}