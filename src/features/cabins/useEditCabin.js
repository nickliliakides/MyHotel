import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditRoom } from "../../services/apiRooms";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ roomData, id }) => createEditRoom(roomData, id),
    onSuccess: () => {
      toast.success('Room updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin }
}