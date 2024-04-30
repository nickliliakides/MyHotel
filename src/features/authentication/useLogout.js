import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    }
  })

  return { logout: mutate, isLoading }
}