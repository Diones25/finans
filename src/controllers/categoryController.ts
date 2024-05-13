import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi from 'joi';

const prisma = new PrismaClient();

const  createRender = (req: Request, res: Response) => {
  res.render('pages/category/create');
}

const createCategory = async (req: Request, res: Response) => {
  const { nome, saldo } = req.body
  
  try {
    const schemaValidator = joi.object({
      nome: joi.string().required(),
      saldo: joi.string().required()
    });

    const category = await prisma.categoria.findMany({
      where: {
        nome: nome
      }
    });
    
    if(category === nome) {
      res.redirect('/cat/render/create');
    }
    else {
      console.log('Categoria não existe')

      const { error } = schemaValidator.validate({
        nome,
        saldo
      })

      if (error) {
        res.redirect('/cat/render/create');
      }

      await prisma.categoria.create({
        data: {
          nome,
          saldo
        }
      });

      res.redirect('/spents/all');
    }

  } catch (error) {
    
  }
}

export default {
  createRender,
  createCategory
}