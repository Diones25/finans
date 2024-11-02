import { prisma } from "../utils/prisma";

export const listOneSpent = async (id: string) => {
  const spent = await prisma.spent.findUnique({
    where: {
      id
    }
  });

  return spent
}

export const createNewSpent = async (value: number, description: string, categoryId: string ) => {
  const newSpent = await prisma.spent.create({
    data: {
      value: value,
      description: description,
      categoryId: categoryId
    }
  });

  return newSpent;
}

export const updateNewSpent = async (id: string, value: number, description: string, categoryId: string) => {
  const updateSpent = await prisma.spent.update({
    where: {
      id
    },
    data: {
      value: value,
      description: description,
      categoryId: categoryId
    }
  });

  return updateSpent;
}