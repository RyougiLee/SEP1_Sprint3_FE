import apiClient from "@/utils/api/client";

export const GradeApi ={
  gradeSubmission: (submissionId:string, data: any) => apiClient.post(`/grades?submissionId=${submissionId}`,data),
  studentGetGrade: (submissionId:string)=> apiClient.get(`/grades/submission/${submissionId}`),
  updateGrade: (gradeId:string, data: any) => apiClient.put(`/grades/${gradeId}`,data),
}