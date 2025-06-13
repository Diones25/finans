import { addBalanceCategory, addCategory, addSpent } from "@/service/api";
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

export const useAddCategory = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
      setTimeout(() => navigate('/'), 2000); 
      toast.success('Categoria cadastrada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar categoria: ${error.message}`);
    },
  });

  return mutation;
}

export const useAddBalanceCategory = (id: string, balance: number) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => addBalanceCategory(id, balance),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
      setTimeout(() => navigate('/'), 2000);
      toast.success('Saldo adicionado com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao adicionar saldo: ${error.message}`);
    },
  });

  return mutation;
}