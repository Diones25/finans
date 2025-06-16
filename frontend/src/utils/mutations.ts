import {
  addBalanceCategory,
  addCategory,
  addSpent,
  deleteCategory,
  deleteSpent,
  editCategory
} from "@/service/api";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "./queryClient";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { EditCategory } from "@/types/EditCategory";

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

export const useRemoveSpent = () => {

  const mutation = useMutation({
    mutationFn: (id: string) => deleteSpent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-spents']
      });
      toast.success('Gasto removido com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao remover gasto: ${error.message}`);
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

export const useEditCategory = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditCategory }) => editCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
      setTimeout(() => navigate('/'), 2000);
      toast.success('Categoria editada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao editar a categoria: ${error.message}`);
    },
  });

  return mutation;
}

export const useRemoveCategory = () => {

  const mutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
      toast.success('Categoria removida com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao remover categoria: ${error.message}`);
    },
  });

  return mutation;
}

export const useAddBalanceCategory = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ id, balance }: { id: string; balance: number }) => addBalanceCategory(id, balance),
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