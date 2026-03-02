import {useMutation} from "@tanstack/react-query";
import {AssignmentsApi, CourseAPI, UserApi} from "@/utils/api";
import {useUserStore} from "@/store";
import {GradeApi} from "@/utils/api/modules/grade";

export const useUpdateGrade = () => {
  return useMutation({
    mutationFn: async ({ submissionId, data }: { submissionId: string; data: any }) => await GradeApi.updateGrade(submissionId, data),
    onSuccess: (res:any) => {
      console.log("Update grade success")
    },
    onError: (error) => {
      console.error("Update grade failed", error)
    }
  })
}