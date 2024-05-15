import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi from 'joi';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  const constructions = await prisma.construction.findMany({});
  return res.status(200).json(constructions);  
}

const create = async (req: Request, res: Response) => {
  const { name, quantity, unitaryValue, amount } = req.body;

  try {
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default {
  list,
  create
}