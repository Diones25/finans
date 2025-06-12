import { getAllSpents } from "@/service/api";
import { useQuery } from "@tanstack/react-query"

export const useAllSpents = (page: number, pageSize: number) => {
  const query = useQuery({
    queryKey: ['all-spents', { page, pageSize }],
    queryFn: () => getAllSpents(page, pageSize),
  });

  return query;
}