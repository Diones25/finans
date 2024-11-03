import { prisma } from "../utils/prisma";

export const listAllSpents = async (skip: number, take: number) => {
  const spents = await prisma.spent.findMany({
    orderBy: [
      {
        createdAt: 'desc'
      }
    ],
    select: {
      id: true,
      value: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          name: true
        }
      }
    },
    skip: skip,
    take: take
  });

  return spents;
}

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

export const removeSpent = async (id: string) => {
  return await prisma.spent.delete({
    where: {
      id
    }
  });
}

export const totalSpentsCount = async () => {
  return await prisma.spent.count();
}