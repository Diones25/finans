import type { Amount } from "@/types/Amount";
import type { Category } from "@/types/Category";
import type { Construction } from "@/types/Construction";
import type { CreateCategory } from "@/types/CreateCategory";
import type { CreateConstruction } from "@/types/CreateConstruction";
import type { CreateSpent } from "@/types/CreateSpent";
import type { EditCategory } from "@/types/EditCategory";
import type { EditConstruction } from "@/types/EditConstruction";
import type { Spent } from "@/types/Spent";
import axios from "axios";


const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: baseUrl
});

export const getAllSpents = async (page: number, pageSize: number): Promise<Spent> => {
  const response = await instance.get('/spent/all', {
    params: {
      page,
      pageSize
    }
  });
  return response.data;
}

export const getOneSpent = async (id: string | undefined) => {
  const response = await instance.get(`/spent/${id}`);
  return response.data;
}

export const addSpent = async (data: CreateSpent) => {
  const response = await instance.post('/spent', data);
  
  return response.data;
}

export const editSpent = async (id: string | undefined, description: string, value: number, categoryId: string) => {
  const response = await instance.put(`/spent/${id}`, {
    description,
    value,
    categoryId
  });

  return response.data;
}

export const deleteSpent = async (id: string) => {
  const response = await instance.delete(`/spent/${id}`);
  return response.data;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await instance.get('/category/all');
  return response.data;
}

export const getOneCategory = async (id: string | undefined) => {
  const response = await instance.get(`/category/${id}`);
  return response.data;
}

export const addCategory = async (data: CreateCategory) => {
  const response = await instance.post('/category/create', data);

  return response.data;
}

export const addBalanceCategory = async (id: string | undefined, balance: number) => {
  const response = await instance.put(`/category/balance/add/${id}`, {
    balance
  });

  return response.data;
}

export const editCategory = async (id: string, data: EditCategory) => {
  const response = await instance.patch(`/category/${id}`, data);
  return response.data;
}

export const deleteCategory = async (id: string) => {
  const response = await instance.delete(`/category/${id}`);
  return response.data;
}

export const getAllConstruction = async (page: number, pageSize: number): Promise<Construction> => {
  const response = await instance.get("/construction/all", {
    params: {
      page,
      pageSize
    }
  })

  return response.data;
}

export const getOneConstruction = async (id: string | undefined) => {
  const response = await instance(`/construction/${id}`);
  return response.data;
}

export const getListAmount = async (): Promise<Amount> => {
  const response = await instance.get('/construction/amount')
  return response.data;
}

export const addConstruction = async (data: CreateConstruction) => {
  const response = await instance.post('/construction', data);

  return response.data;
}

export const editConstruction = async (id: string | undefined, data: EditConstruction) => {
  const response = await instance.patch(`/construction/${id}`, data);

  return response.data;
}

export const deleteConstruction = async (id: string) => {
  const response = await instance.delete(`/construction/${id}`);
  return response.data;
}