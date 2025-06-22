import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formateDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY');
}

export const formatCurrency = (value: number) => {
  return `R$ ${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(value)}`;
}