import { addSpent } from "@/service/api";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "./queryClient";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const useAddSpent = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addSpent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-spents'],
      });
      setTimeout(() => navigate('/'), 2000); // Dá tempo para o toast aparecer //Remover o navigate se eu for utilizar o modal
      toast.success('Gasto cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar gasto: ${error.message}`);
    },
  });

  return mutation;
}