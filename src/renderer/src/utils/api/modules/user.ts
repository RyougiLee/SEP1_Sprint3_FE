import apiClient from "@/utils/api/client";

export interface User {
  id: number;
  role: 'teacher' | 'student';
  username: string;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export const UserApi = {
  getDetail: (id: number) => apiClient.get<Partial<User>>(`/users/${id}`),
  modify: (id: number, data:Partial<User>) => apiClient.patch<User>(`/users/${id}`,{data}),

}