import apiClient from "@/utils/api/client";

export const SubmissionApi ={
  createDraft: (assignmentId: string, discription:string) => apiClient.post(`/submissions?assignmentId=${assignmentId}`,{ description: discription }),
  studentGetSubmission: (assignmentId: string) => apiClient.get(`/submissions/my?assignmentId=${assignmentId}`),
  updateDescription: (submissionId: string, discription: string) => apiClient.put(`/submissions/${submissionId}/description`,{ description: discription }),
  submitDraft:(submissionId: string)=> apiClient.put(`/submissions/${submissionId}/submit`),
  teacherGetSubmission: (assignmentId:string)=> apiClient.get(`submissions?assignmentId=${assignmentId}`),
  getSingleSubmission: (submissionId:string)=> apiClient.get(`submissions/${submissionId}`),
}