import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../../services/apiAuth"

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user)
      navigate("/dashboard", { replace: true });
    },
    onError: error => {
      console.log("🚀 ~ useLogin ~ err:", error)
      toast.error('Provided email or password is incorrect. Please try again.')
    }
  })

  return { login: mutate, isLoading }
}