import apiClient from "@/utils/api/client";
import {User} from "@/utils/api/modules/user";

export interface Assignment {
  assignment_id: number;
  course_id: number;
  createdBy: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  status: 'draft' | 'published';
  allowedFileTypes: string | null;
  maxFileSizeMb: number | null;
  createdAt: string;
  updatedAt: string;
}

export const AssignmentsApi = {
  getDetail: (id: string) => apiClient.get<Partial<Assignment>>(`/assignments/{id}`),
  modify: (id: string, data:Partial<Assignment>) => apiClient.put<Partial<Assignment>>(`/assignments/${id}`,data),
  create: (data:Partial<Assignment>)=> apiClient.post<Partial<Assignment>>('assignments',data),
  publish: (id: string) => apiClient.put(`/assignments/${id}/publish`),
  delete: (id: string)=> apiClient.delete(`assignments/${id}`),
}