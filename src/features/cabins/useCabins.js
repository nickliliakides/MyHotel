import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });

  return { isLoading, error, cabins }
}