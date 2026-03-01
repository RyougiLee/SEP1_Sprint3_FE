import {useMutation} from "@tanstack/react-query";
import {UserApi} from "@/utils/api";
import {useUserStore} from "@/store";

export const useUserLogin = () => {
  const { setAuth } = useUserStore();
  return useMutation({
    mutationFn: async (formData: any) => await UserApi.login(formData),
    onSuccess: (res:any) => {
      if(res?.token){
        setAuth(res.user, res.token);
      }
  },
    onError: (error) => {
      console.error("Login failed", error)
    }
  })
}