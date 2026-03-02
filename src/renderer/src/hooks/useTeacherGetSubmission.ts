import {useMutation} from "@tanstack/react-query";
import {SubmissionApi} from "@/utils/api/modules/submission";

export const useTeacherGetSubmission = () => {
  return useMutation({
    mutationFn: async (assignmentId: string) => await SubmissionApi.teacherGetSubmission(assignmentId),
    onSuccess: (res:any) => {
      console.log("Get submissions success")
    },
    onError: (error) => {
      console.error("Get submissions failed", error)
    }
  })
}