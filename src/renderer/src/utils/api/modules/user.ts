import apiClient from "@/utils/api/client";

export interface User {
  user_id: number;
  role: 'teacher' | 'student';
  username: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const UserApi = {
  getDetail: (id: number) => apiClient.get<Partial<User>>(`/users`, {
  params:{
    id: id
  }
}),
  modify: (id: number, data:Partial<User>) => apiClient.patch<User>(`/users/${id}`,{data}),

}