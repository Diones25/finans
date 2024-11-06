import { prisma } from "../utils/prisma";

export const listAllConstruction = async (skip: number, take: number) => {
    const constructions = await prisma.construction.findMany({
        orderBy: [
            {
                createdAt: 'desc'
            }
        ],
        skip: skip,
        take: take
    });

    return constructions;
}