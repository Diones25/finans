import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi from 'joi';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  return res.json(categories)
}

const create = async (req: Request, res: Response) => {
  const { name, balance } = req.body

  try {    
    const existingCategory = await prisma.category.findFirst({
      where: {
        name
      }
    });

    if (existingCategory) { 
      res.json({ message: "Categoria já existe" })
    }
    else {      
      const schemaValidator = joi.object({
        name: joi.string().required(),
        balance: joi.number().required()
      });

      const validation = schemaValidator.validate(req.body, { abortEarly: false });

      if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);        
        return res.status(400).json({ message: errors });
      }

      await prisma.category.create({
        data: {
          name,
          balance
        }
      });

      res.status(201).json({ message: "Categoria criada com sucesso" });
    }

  } catch (error) {
    return res.json({ message: error });
  }
}

const addBalanceCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { balance } = req.body;

  try {
    const balanceBD = await prisma.category.findUnique({
      where: {
        id
      },
      select: {
        balance: true
      }
    })

    const newBalance = Number(balanceBD?.balance) + Number(balance);

    const schemaValidator = joi.object({
      balance: joi.number().required()
    });

    const { error } = schemaValidator.validate({
      balance
    })

    const valid = error == null

    if (!valid) {
      res.json({ message: error.message })
    }
    else {
      await prisma.category.update({
        data: {
          balance: newBalance
        },
        where: {
          id
        }
      });

      res.status(200).json({ message: "Saldo adicionado com sucesso" })
    }    
  } catch (error) {
    return res.json({ message: error })
  }

  
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, balance } = req.body

  try {
    const schemaValidator = joi.object({
      name: joi.string().required(),
      balance: joi.number().required()
    });

    const { error } = schemaValidator.validate({
      name,
      balance
    })

    const valid = error == null

    if (!valid) {
      res.json({ message: error.message });
    }
    else {
      await prisma.category.update({
        where: {
          id
        },
        data: {
          name,
          balance
        }
      });

      res.status(201).json({ message: "Categoria atualizada com sucesso" });
    }    
  } catch (error) {
    return res.json({ message: error });
  }
}

const remove = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: {
        id
      }
    });
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    
  }
}

export default {
  list,
  create,
  addBalanceCategory,
  edit,
  remove
}

