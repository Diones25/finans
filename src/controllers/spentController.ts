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

    console.log(category?.balance)
    //console.log(Number(category?.balance))

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

    await prisma.spent.create({
      data: {
        value,
        description,
        categoryId
      }
    });

    return res.status(200).json({ message: 'Gasto adicionado com sucesso' })

  } catch (error) {
    return res.json({ message: error });
  }
}

const edit = async (req: Request, res: Response) => {

}

const remove = async (req: Request, res: Response) => {

}

export default {
  list,
  addSpent,
  edit,
  remove
}