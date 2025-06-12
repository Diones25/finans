import { addSpent } from "@/service/api";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "./queryClient";

export const useAddSpent = () => {
  const mutation = useMutation({
    mutationFn: addSpent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-spents'],
      });
    }
  });

  return mutation;
}