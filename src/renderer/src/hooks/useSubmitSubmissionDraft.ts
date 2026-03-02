import {useMutation} from "@tanstack/react-query";
import {SubmissionApi} from "@/utils/api/modules/submission";

export const useSubmitSubmissionDraft = () => {
  return useMutation({
    mutationFn: async (submissionId: string) => await SubmissionApi.submitDraft(submissionId),
    onSuccess: (res:any) => {
      console.log("Submit submission success")
    },
    onError: (error) => {
      console.error("Submit submission failed", error)
    }
  })
}