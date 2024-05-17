import { Category } from "@/components/types/Category";
import { Spent } from "@/components/types/Spent";

const baseUrl = "http://localhost:3333"

export const getAllSpents = async (): Promise<Spent[]> => {
  const res = await fetch(`${baseUrl}/spent/all`);
  const json = res.json();
  return json;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${baseUrl}/category/list`);
  const json = res.json();    
  return json;
}

export const addCategory = async (name: string, balance: number) => {
  const res = await fetch(`${baseUrl}/category/create`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name,
      balance
    })
  });

  const json = res.json();
  return json;
}

export const editCategory = async (id: string, name: string, balance: string) => {
  const res = await fetch(`${baseUrl}/category/edit/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name,
      balance
    })
  });

  const json = res.json();
  return json;
}

export const deleteCategory = async (id: string) => {
  const res = await fetch(`${baseUrl}/category/remove/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const json = res.json();
  return json;
}