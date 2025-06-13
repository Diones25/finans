import { addSpent } from "@/service/api";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "./queryClient";
import { toast } from 'react-toastify';

export const useAddSpent = () => {
  const { mutate: mutation, reset } = useMutation({
    mutationFn: addSpent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-spents'],
      });
      //Reseta o formulário
      reset();
      toast.success('Gasto cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar gasto: ${error.message}`);
    },
  });

  return mutation;
}