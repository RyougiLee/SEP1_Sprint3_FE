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
  getDetail: (id: number) => apiClient.get<Partial<User>>(`/users/${id}`),
  modify: (id: number, data:Partial<User>) => apiClient.patch<User>(`/users/${id}`,{data}),
}