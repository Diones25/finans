import { getAllCategories, getAllSpents, getOneCategory } from "@/service/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useAllSpents = (page: number, pageSize: number) => {
  const query = useQuery({
    queryKey: ['all-spents', { page, pageSize }],
    queryFn: () => getAllSpents(page, pageSize),
    placeholderData: keepPreviousData
  });

  return query;
}

export const useCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return query;
}

export const useCategory = (id: string) => {
  const query = useQuery({
    queryKey: ['category'],
    queryFn: () => getOneCategory(id),
  });

  return query;
}