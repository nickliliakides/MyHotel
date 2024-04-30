import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditRoom } from "../../services/apiRooms";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditRoom,
    onSuccess: () => {
      toast.success('New room created successfully!');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin }
}