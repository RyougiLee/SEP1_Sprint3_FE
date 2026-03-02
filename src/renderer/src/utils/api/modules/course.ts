import apiClient from "@/utils/api/client";
import {Assignment} from "@/utils/api";

interface CourseQueryParams{
  _page?: number;
  _limit?: number;
  course_code?: string;
  is_archived?: boolean;
}

export interface Course {
  course_id: number;
  courseName: string;
  courseCode: string;
  isArchived: boolean;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export const CourseAPI = {
  list: (params?: CourseQueryParams) => apiClient.get<Course[]>('/courses', { params }),

  listMyEnrolled: (userId: number) =>
      apiClient.get(`/enrollments/user/${userId}`),

  getDetail: (id: string)=> apiClient.get<Course>(`/courses/${id}`),

  create: (data: Partial<Course>)=> apiClient.post<Course>('/courses',data),

  modify: (id: string, data:Partial<Course>) => apiClient.put<Course>(`/courses/${id}`,data),

  getAssignments: (id: string) => apiClient.get<Assignment>(`/assignments?courseId=${id}`),

  listMyCreated: (teacherId: string)=> apiClient.get<Course[]>(`/courses?teacherId=${teacherId}`),

  archive: (courseId: string) => apiClient.put(`/courses/${courseId}/archive`),

  unarchive: (courseId: string) => apiClient.put(`/courses/${courseId}/unarchive`),

  enroll: (courseId: string, userId: string)=> apiClient.post(`/enrollments/course/${courseId}/user/${userId}`),

  unenroll: (courseId: string, userId: string)=> apiClient.delete(`/enrollments/course/${courseId}/user/${userId}`),

  getEnrolled: (courseId: string)=> apiClient.get(`/enrollments/course/${courseId}`),
}