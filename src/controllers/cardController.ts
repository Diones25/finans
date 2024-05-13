import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import joi from 'joi';

const prisma = new PrismaClient();

const home = async (req: Request, res: Response) => {  
  /*
  const categorias = await prisma.categoria.findMany({
    include: {
      saldo: {
        select: {
          valor: true
        }
      }
    }
  })
  */
  const categorias = await prisma.categoria.findMany({})
  res.render('pages/home', { categorias })
}

const pageSpents = async (req: Request, res: Response) => {
  const categorias = await prisma.categoria.findMany();  
  res.render('pages/createSpents', { categorias });
}

const pageCreateCategory = (req: Request, res: Response) => {
  res.render('pages/createCategory');
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

    if (category === nome) {
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

const pageAddCategoryBalance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoria = prisma.categoria.findUnique({
      where: {
        id
      }
    })
    res.render('pages/addBalanceCategory', { categoria });
  } catch (error) {

  }
}

const addBalanceCategory = async (req: Request, res: Response) => {
  const { id, saldo } = req.body;

  // const saldoBD = await prisma.categoria.findUnique({
  //   where: {
  //     id
  //   }
  // })

  console.log(id)
  return;
}

const editCategory = (req: Request, res: Response) => {

}

const deleteCategory = (req: Request, res: Response) => {

}

export default {
  home,
  pageSpents,
  pageCreateCategory,
  createCategory,
  pageAddCategoryBalance,
  addBalanceCategory,
  editCategory,
  deleteCategory
}