import {
  addBalanceCategory,
  addCategory,
  addConstruction,
  addSpent,
  deleteCategory,
  deleteConstruction,
  deleteSpent,
  editCategory,
  editConstruction,
  login,
  registerUser,
} from "@/service/api";
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "./queryClient";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import type { EditCategory } from "@/types/EditCategory";
import type { EditConstruction } from "@/types/EditConstruction";
import axios from "axios";
import { useAuthStore } from "@/store/auth";


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

export const useAddConstruction = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addConstruction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-constructions']
      });
      queryClient.invalidateQueries({
        queryKey: ['amount']
      });
      setTimeout(() => navigate('/construction'), 2000);
      toast.success('Gasto cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar gasto: ${error.message}`);
    },
  });

  return mutation;
}

export const useEditConstruction = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditConstruction }) => editConstruction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-constructions']
      });
      queryClient.invalidateQueries({
        queryKey: ['amount']
      });
      setTimeout(() => navigate('/construction'), 2000);
      toast.success('Gasto editada com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao editar o gasto: ${error.message}`);
    },
  });

  return mutation;
}

export const useRemoveconstruction = () => {

  const mutation = useMutation({
    mutationFn: (id: string) => deleteConstruction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-constructions']
      });
      queryClient.invalidateQueries({
        queryKey: ['amount']
      });
      toast.success('Gasto removido com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao remover gasto: ${error.message}`);
    },
  });

  return mutation;
}

function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string | string[] } | undefined;
    const msg = data?.message;
    if (Array.isArray(msg)) return msg.join("\n");
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return error instanceof Error ? error.message : "Erro inesperado";
}

export const useLogin = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      queryClient.invalidateQueries();
      toast.success("Login realizado com sucesso!");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  return mutation;
};

export const useRegister = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      queryClient.invalidateQueries();
      toast.success("Conta criada com sucesso!");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  return mutation;
};
