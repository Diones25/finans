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

export const totalConstructionsCount = async () => {
    return await prisma.construction.count();
}

export const listOneConstruction = async (id: string) => {
    const construction = await prisma.construction.findUnique({
        where: {
            id
        }
    });
    return construction;
}

export const createConstruction = async (name: string, quantity: number, unitaryValue: number, amount: number) => {
    const newConstruction = await prisma.construction.create({
        data: {
            name: name,
            quantity: quantity,
            unitaryValue: unitaryValue,
            amount: amount
        }
    });
    return newConstruction;
}

export const constructionAmount = () => {
    return prisma.construction.findMany({
        select: {
            amount: true
        }
    });
}

export const updateConstruction = async (id: string, name: string, quantity: number, unitaryValue: number, amount: number) => {
    const updateConstruction = await prisma.construction.update({
        where: {
            id
        },
        data: {
            name: name,
            quantity: quantity,
            unitaryValue: unitaryValue,
            amount: amount
        }
    });

    return updateConstruction;
}

export const deleteConstrcution = async (id: string) => {
    return await prisma.construction.delete({
        where: {
            id
        }
    });
}