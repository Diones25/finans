import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

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
  res.render('pages/card/home', { categorias })
}

const createRender = async (req: Request, res: Response) => {
  const categorias = await prisma.categoria.findMany();  
  res.render('pages/card/create', { categorias });
}

const create = (req: Request, res: Response) => {

}

export default {
  home,
  createRender,
  create
}