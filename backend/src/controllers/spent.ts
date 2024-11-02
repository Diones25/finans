import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {
  createNewSpent,
  listOneSpent,
  removeSpent,
  updateNewSpent
} from '../service/spent';
import { addSpentSchema } from '../schemas/add-spent';
import { findCategoryById, updateCategoryBalance } from '../service/category';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  
  try {
    let page = Number(req?.query?.page) || 1;
    let pageSize = Number(req?.query?.pageSize) || 4;

    if (page < 0) {
      page = 1;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

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

    const totalSpents = await prisma.spent.count();
    const totalPages = Math.ceil(totalSpents / pageSize);

    const data = {
      spents,
      totalSpents,
      totalPages,
      pageSize: pageSize,
      page: page
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const listOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const spent = await listOneSpent(id);

    if (!spent) {
      return res.status(404).json({ message: "Gasto não encontrado" });
    }

    return res.status(200).json(spent);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const addSpent = async (req: Request, res: Response) => {
  const safeData = addSpentSchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }
  
  try {
    const category = await findCategoryById(safeData.data.categoryId);     

    if (Number(category?.balance) < safeData.data.value) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    const newBalance = Number(category?.balance) - Number(safeData.data.value);
    await updateCategoryBalance(safeData.data.categoryId, newBalance);

    const newSpent = await createNewSpent(safeData.data.value, safeData.data.description, safeData.data.categoryId);

    return res.status(200).json(newSpent)

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const safeData = addSpentSchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    const updateSpent = await updateNewSpent(id, safeData.data.value, safeData.data.description, safeData.data.categoryId);
    return res.status(200).json(updateSpent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await removeSpent(id);
    return res.status(200).json({ message: 'Gasto deletado com sucesso' });

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default {
  list,
  listOne,
  addSpent,
  edit,
  remove
}