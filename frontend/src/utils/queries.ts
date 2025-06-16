import { getAllCategories, getAllConstruction, getAllSpents, getListAmount, getOneCategory, getOneConstruction } from "@/service/api";
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
    queryKey: ['category', id],
    queryFn: () => getOneCategory(id),
  });

  return query;
}

export const useAllConstructions = (page: number, pageSize: number) => {
  const query = useQuery({
    queryKey: ['all-constructions', { page, pageSize }],
    queryFn: () => getAllConstruction(page, pageSize),
    placeholderData: keepPreviousData
  });

  return query;
}

export const useConstruction = (id: string) => {
  const query = useQuery({
    queryKey: ['construction', id],
    queryFn: () => getOneConstruction(id),
  });

  return query;
}

export const useListAmount = () => {
  const query = useQuery({
    queryKey: ['amount'],
    queryFn: getListAmount,
  });

  return query;
}