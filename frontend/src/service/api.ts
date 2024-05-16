import { Category } from "@/components/types/Category";

const baseUrl = "http://localhost:3333"

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${baseUrl}/category/list`);
  const json = res.json();    
  return json;
}

