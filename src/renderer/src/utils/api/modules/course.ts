import apiClient from "@/utils/api/client";

interface CourseQueryParams{
  _page?: number;
  _limit?: number;
  course_code?: string;
  is_archived?: boolean;
}

interface Course{
  id: number;
  course_name: string;
  course_code: string;
  is_archived: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export const CourseAPI = {
  list: (params?: CourseQueryParams) => apiClient.get<Course[]>('/courses', { params }),
  getDetail: (id: number)=> apiClient.get<Course>(`/courses/${id}`),
  create: (data: Partial<Course>)=> apiClient.post<Course>('/courses',data),
  modify: (id: number, data:Partial<Course>) => apiClient.patch<Course>(`/courses/${id}`,{data})
}