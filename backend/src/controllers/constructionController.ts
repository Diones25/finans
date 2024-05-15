import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi, { number, string } from 'joi';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  try {
    const constructions = await prisma.construction.findMany({});
    return res.status(200).json(constructions); 
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

    return res.status(200).json(newConstruction);
    
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

/*
const spending = await this.spendingRepository.find({
      select: {
        valorTotal: true
      }
    });

    const nums = spending.map(function(item) {
      return item.valorTotal;
    })

    const total = nums.reduce((acumulador, elemento) => acumulador + elemento, 0);

    return total;
*/

export default {
  list,
  create,
  getAmount
}