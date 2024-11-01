import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi from 'joi';
import { addBalanceCat } from '../schemas/add-balance-category';
import { findAllCategories, findOneCategory } from '../service/category';

const prisma = new PrismaClient();

const list = async (req: Request, res: Response) => {
  
  try {
    const categories = await findAllCategories();
    return res.json(categories);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const listOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findOneCategory(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    return res.status(200).json(category);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
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

      const newCategory = await prisma.category.create({
        data: {
          name,
          balance
        }
      });

      res.status(201).json(newCategory);
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const addBalanceCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const safeData = addBalanceCat.safeParse(req.body);

  try {
    const balanceBD = await prisma.category.findUnique({
      where: {
        id
      },
      select: {
        balance: true
      }
    })

    const newBalance = Number(balanceBD?.balance) + Number(safeData.data?.balance);

    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    const newBalanceCategory = await prisma.category.update({
      data: {
        balance: newBalance
      },
      where: {
        id
      }
    });

    res.status(200).json(newBalanceCategory);
        
  } catch (error) {
    return res.status(500).json({ message: error });
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

    const validation = schemaValidator.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map(detail => detail.message);
      return res.status(400).json({ message: errors });
    }

    const updateCategory = await prisma.category.update({
      where: {
        id
      },
      data: {
        name,
        balance
      }
    });

    res.status(201).json(updateCategory);
        
  } catch (error) {
    return res.status(500).json({ message: error });
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
    return res.status(500).json({ message: error });
  }
}

export default {
  list,
  listOne,
  create,
  addBalanceCategory,
  edit,
  remove
}

