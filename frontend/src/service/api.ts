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

