import {useAuth} from "@/hooks/useAuth";
import {useMyCourses} from "@/hooks/useMyCourses";
import {IconDatabase} from "@tabler/icons-react";
import {useGetUserDetails} from "@/hooks/useGetUserDetails";
import {useUserStore} from "@/store";

export function useSidebarData() {
  const {user} = useAuth();
  const userDetail = useUserStore(state => state.user)
  const{ data: courses, isLoading : coursesLoading} = useMyCourses(user?.id);
  // @ts-ignore
  const navWorkspaces = (courses || []).map((course: { courseName: any; courseId: any; }) => ({

    name: course.courseName,
    url: `/#/workspaces/${course.courseId}`,
    icon: IconDatabase,
  }));

  const navUser = {
    name: (userDetail as any)?.fullName,
    email: (userDetail as any)?.email,
    avatar: "https://pbs.twimg.com/profile_images/1934604096973271040/LyHoR0xg_400x400.jpg",
  }

  return{navWorkspaces, navUser, isLoading: coursesLoading};
}