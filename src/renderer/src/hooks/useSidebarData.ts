import {useAuth} from "@/hooks/useAuth";
import {useMyCourses} from "@/hooks/useMyCourses";
import {IconDatabase} from "@tabler/icons-react";
import {useGetUserDetails} from "@/hooks/useGetUserDetails";
import {useUserStore} from "@/store";
import {useGetCoursesCreated} from "@/hooks/useGetCoursesCreated";

export function useSidebarData() {
  const {user} = useAuth();
  const userDetail = useUserStore(state => state.user)
  const{ data: courses, isLoading : coursesLoading} : {data: any, isLoading: boolean} = useMyCourses(user?.id);

  const navWorkspaces = (courses || []).map((course: { courseName: any; courseId: any; }) => ({

    name: course.courseName,
    url: `/workspaces/${course.courseId}`,
    icon: IconDatabase,
  }));

  const navUser = {
    name: (userDetail as any)?.fullName,
    email: (userDetail as any)?.email,
    avatar: "https://i.scdn.co/image/ab67616d0000b273b652c92353719de32c85480e",
  }

  const{ data: coursesCreated, isLoading : coursesCreatedLoading} : {data: any, isLoading: boolean} = useGetCoursesCreated(user?.id);

  const navWorkspacesCreated = (coursesCreated || []).map((course: { name: any; id: any; }) => ({

    name: course.name,
    url: `/workspaces/${course.id}`,
    icon: IconDatabase,
  }));

  return{navWorkspaces, navWorkspacesCreated, navUser, isLoading: coursesLoading || coursesCreatedLoading};
}