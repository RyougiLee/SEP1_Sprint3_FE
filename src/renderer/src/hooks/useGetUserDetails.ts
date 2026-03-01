import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {UserApi} from "@/utils/api";

export const useGetUserDetails = (userId: number, options?: Partial<UseQueryOptions<any>>) => {
  return useQuery({
    queryKey: ['get-user-details', userId],
    queryFn: async () => await UserApi.getDetail(userId),...options,
  })
}