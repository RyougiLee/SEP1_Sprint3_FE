import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";
import {GradeApi} from "@/utils/api/modules/grade";

export const useGradeSubmission = () => {
  return useMutation({
    mutationFn: async ({ submissionId, data }: { submissionId: string; data: any }) => await GradeApi.gradeSubmission(submissionId, data),
    onSuccess: (res:any) => {
      console.log("Add grade success")
    },
    onError: (error) => {
      console.error("Add grade failed", error)
    }
  })
}