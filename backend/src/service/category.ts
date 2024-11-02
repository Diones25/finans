import { prisma } from "../utils/prisma"

export const findAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ]
  });

  return categories;
}

export const findOneCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id
    }
  });

  return category;
}

export const findCategoryByName = async (name: string) => {
  const category = await prisma.category.findFirst({
    select: {
      name: true
    },
    where: {
      name
    }
  });

  return category;
}

export const createCategory = async (name: string, balance: number) => {
  const newCategory = await prisma.category.create({
    data: {
      name,
      balance
    }
  });

  return newCategory;
}

export const addBalance = async (id: string, balance: number) => {
  const newBalanceCategory = await prisma.category.update({
    data: {
      balance
    },
    where: {
      id
    }
  });
  return newBalanceCategory;
}

export const findBalance = async (id: string) => {
  const balanceBD = await prisma.category.findUnique({
    where: {
      id
    },
    select: {
      balance: true
    }
  });
  return balanceBD;
}

export const updateCategory = async (id: string, name: string, balance: number) => {
  const updateCategory = await prisma.category.update({
    where: {
      id
    },
    data: {
      name,
      balance
    }
  });

  return updateCategory;
}

export const removeCategory = async (id: string) => {
  return await prisma.category.delete({
    where: {
      id
    }
  });
}