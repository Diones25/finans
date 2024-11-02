import { prisma } from "../utils/prisma";

export const listOneSpent = async (id: string) => {
  const spent = await prisma.spent.findUnique({
    where: {
      id
    }
  });

  return spent
}