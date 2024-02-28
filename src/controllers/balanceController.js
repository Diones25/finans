import Balance from '../models/Balance.js';
import Category from '../models/Category.js';

const createRender = async (req, res) => {
  const categories = await Category.findAll();
  res.render('pages/balance/create', { categories })
}

const create = async (req, res) => {
  const { val_balance, idCategory } = req.body;

  let balance = Number(val_balance);

  const newBalance = {
    val_balance: balance,
    idCategory: idCategory
  }

  if(balance <= 0) {
    console.log("Adicione um valor maior do que zero")
    res.redirect('/balance/render/create');
  }
  else {
    await Balance.create(newBalance); 
    res.redirect('/spents/all');
  }

  console.log(typeof balance)
  
}

export default {
  createRender,
  create 
}