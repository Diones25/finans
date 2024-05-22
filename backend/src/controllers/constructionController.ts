import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi, { number, string } from 'joi';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  try {
    const page = Number(req?.query?.page) || 1;
    const pageSize = Number(req?.query?.pageSize) || 5;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [constructions, totalConstructions] = await prisma.$transaction([
      prisma.construction.findMany({
        orderBy: [
          {
            name: 'asc'
          }
        ],
        skip: skip,
        take: take
      }),
      prisma.construction.count()
    ])

    const totalPages = Math.ceil(totalConstructions / pageSize);


    //const constructions = await prisma.construction.findMany({});
    return res.status(200).json({
      constructions,
      totalConstructions,
      totalPages,
      pageSize: pageSize
    }); 
  } catch (error) {
    return res.status(500).json({ message: error });
  } 
}

const listOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const construction = await prisma.construction.findUnique({
      where: {
        id
      }
    });
    return res.status(200).json(construction);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const create = async (req: Request, res: Response) => {
  const { name, quantity, unitaryValue } = req.body;

  try {
    const addConstructionSchema = joi.object({
      name: joi.string().required(),
      quantity: joi.number().required(),
      unitaryValue: joi.number().required(),
      amount: joi.number().optional()
    });

    const validation = addConstructionSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map(detail => detail.message);
      return res.status(400).json({ message: errors });
    }

    const newAmount = quantity * unitaryValue;

    const newConstruction = await prisma.construction.create({
      data: {
        name,
        quantity,
        unitaryValue,
        amount: newAmount
      }
    });

    return res.status(201).json(newConstruction);
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const getAmount = async (req: Request, res: Response) => {
  try {
    const constructions = await prisma.construction.findMany({
      select: {
        amount: true
      }
    });

    const nums = constructions.map((item) => {
      return item.amount
    });

    const amount = nums.reduce((acumulator, element) => Number(acumulator) + Number(element), 0);

    return res.status(200).json(amount)

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, quantity, unitaryValue } = req.body;

  try {
    const newAmount = quantity * unitaryValue;

    const updateConstruction = await prisma.construction.update({
      where: {
        id
      },
      data: {
        name,
        quantity,
        unitaryValue,
        amount: newAmount
      }
    });

    return res.status(200).json(updateConstruction);
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.construction.delete({
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
  create,
  getAmount,
  edit,
  remove
}