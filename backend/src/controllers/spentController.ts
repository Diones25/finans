import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi, { string } from 'joi';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  
  try {
    let page = Number(req?.query?.page) || 1;
    let pageSize = Number(req?.query?.pageSize) || 5;

    if (page < 0) {
      page = 1;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const spents = await prisma.spent.findMany({
      orderBy: [
        {
          description: 'asc'
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
    const spent = await prisma.spent.findUnique({
      where: {
        id
      }
    });

    return res.status(200).json(spent);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
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
    return res.status(500).json({ message: error });
  }
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value, description, categoryId } = req.body;

  try {
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

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.spent.delete({
      where: {
        id
      }
    });

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