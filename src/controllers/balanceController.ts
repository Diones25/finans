import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const createRender = async (req: Request, res: Response) => {
  //const categories = await prisma.category.findMany();
  //res.render('pages/balance/create', { categories })
}

const create = async (req: Request, res: Response) => {
  // const { val_balance, idCategory } = req.body;

  // let balance = Number(val_balance);

  // const newBalance = {
  //   val_balance: balance,
  //   idCategory: idCategory
  // }

  // if(balance <= 0) {
  //   console.log("Adicione um valor maior do que zero")
  //   res.redirect('/balance/render/create');
  // }
  // else {
  //   await Balance.create(newBalance); 
  //   res.redirect('/spents/all');
  // }

  // console.log(typeof balance)
  
}

export default {
  createRender,
  create 
}