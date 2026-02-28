import {useQuery} from "@tanstack/react-query";
import {UserApi} from "@/utils/api";

export const useGetUserDetails = (userId: number) => {
  return useQuery({
    queryKey: ['get-user-details', userId],
    queryFn: async () => await UserApi.getDetail(userId),
    select: (res:any) => res[0],
  })
}