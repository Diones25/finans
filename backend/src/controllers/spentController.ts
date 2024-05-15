import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi, { string } from 'joi';
import { z } from 'zod';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  const spents = await prisma.spent.findMany({
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  });
  return res.status(200).json(spents);
}

const addSpent = async (req: Request, res: Response) => {
  const { value, description, categoryId } = req.body;

  try {
    const addSpentSchema = joi.object({
      value: joi.number().required(),
      description: joi.string().required(),
      categoryId: joi.string().required()
    });

    const validation = addSpentSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map(detail => detail.message);
      return res.status(400).json({ message: errors });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId
      },
      select: {
        balance: true
      }
    });      

    if (Number(category?.balance) < value) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    const newBalance = Number(category?.balance) - Number(value);

    await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        balance: newBalance
      }
    })

    const newSpent = await prisma.spent.create({
      data: {
        value,
        description,
        categoryId
      }
    });

    return res.status(200).json(newSpent)

  } catch (error) {
    return res.json({ message: error });
  }
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value, description, categoryId } = req.body;

  const updateSpent = await prisma.spent.update({
    where: {
      id
    },
    data: {
      value,
      description,
      categoryId
    }
  });

  return res.status(200).json(updateSpent);
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.spent.delete({
    where: {
      id
    }
  });

  return res.status(200).json({ message: 'Gasto deletado com sucesso' });
}

export default {
  list,
  addSpent,
  edit,
  remove
}