import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRoom } from "../../services/apiRooms";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['rooms'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin }
}

