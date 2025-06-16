import axios from "axios";
import { Category } from "@/types/Category";
import { Spent } from "@/types/Spent";
import { CreateSpent } from "@/types/CreateSpent";
import { CreateCategory } from "@/types/CreateCategory";
import { EditCategory } from "@/types/EditCategory";
import { Construction } from "@/types/Construction";

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

export const getListAmount = async () => {
  const response = await instance.get('/construction/amount')
  return response.data;
}

export const addConstruction = async (name: string, quantity: number, unitaryValue: number) => {
  const response = await instance.post('/construction', {
    name,
    quantity,
    unitaryValue
  });

  return response.data;
}

export const editConstruction = async (id: string | undefined, name: string, quantity: number, unitaryValue: number) => {
  const response = await instance.put(`/construction/${id}`, {
    name,
    quantity,
    unitaryValue
  });

  return response.data;
}

export const deleteConstruction = async (id: string) => {
  const response = await instance.delete(`/construction/${id}`);
  return response.data;
}