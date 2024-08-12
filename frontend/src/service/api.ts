import axios from "axios";
import { Category } from "@/components/types/Category";
import { Spent } from "@/components/types/Spent";
import { Construction } from "@/components/types/Construction";

const baseUrl = "http://localhost:3000"

const instance = axios.create({
  baseURL: baseUrl
});

export const getAllSpents = async (page: number, totalPages: number): Promise<Spent> => {
  const response = await instance.get('/spent/all', {
    params: {
      page,
      totalPages
    }
  });
  return response.data;
}

export const getOneSpent = async (id: string | undefined) => {
  const response = await instance.get(`/spent/${id}`);
  return response.data;
}

export const addSpent = async (value: number, description: string, categoryId: string) => {
  const response = await instance.post('/spent/create', {
    value,
    description,
    categoryId
  });
  
  return response.data;
}

export const editSpent = async (id: string | undefined, description: string, value: number, categoryId: string) => {
  const response = await instance.put(`/spent/update/${id}`, {
    description,
    value,
    categoryId
  });

  return response.data;
}

export const deleteSpent = async (id: string) => {
  const response = await instance.delete(`/spent/remove/${id}`);
  return response.data;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await instance.get('/category/list');   
  return response.data;
}

export const getOneCategory = async (id: string | undefined) => {
  const response = await instance.get(`/category/${id}`);
  return response.data;
}

export const addCategory = async (name: string, balance: number) => {
  const response = await instance.post('/category/create', {
    name,
    balance
  });

  return response.data;
}

export const addBalanceCategory = async (id: string | undefined, balance: number) => {
  const response = await instance.put(`/category/add/balance/${id}`, {
    balance
  });

  return response.data;
}

export const editCategory = async (id: string | undefined, name: string, balance: string) => {
  const response = await instance.put(`/category/edit/${id}`, {
    name,
    balance
  });
  return response.data;
}

export const deleteCategory = async (id: string) => {
  const response = await instance.delete(`/category/remove/${id}`);
  return response.data;
}

export const getAllConstruction = async (page: any, totalPages: any): Promise<Construction> => {
  const response = await instance.get("/construction/all", {
    params: {
      page,
      totalPages
    }
  })

  return response.data;
}

export const getOneConstruction = async (id: string | undefined) => {
  const response = await instance(`/construction/${id}`);
  return response.data;
}

export const getListAmount = async () => {
  const response = await instance.get('/construction/list/amount')
  return response.data;
}

export const addConstruction = async (name: string, quantity: number, unitaryValue: number) => {
  const response = await instance.post('/construction/create', {
    name,
    quantity,
    unitaryValue
  });

  return response.data;
}

export const editConstruction = async (id: string | undefined, name: string, quantity: number, unitaryValue: number) => {
  const response = await instance.put(`/construction/edit/${id}`, {
    name,
    quantity,
    unitaryValue
  });

  return response.data;
}

export const deleteConstruction = async (id: string) => {
  const response = await instance.delete(`/construction/remove/${id}`);  
  return response.data;
}