import Category from '../models/Category.js';
import Balance from '../models/Balance.js';

const home = async (req, res) => {  

  const categories = await Category.findAll();
  res.render('pages/card/home', { categories })
}

const createRender = async (req, res) => {
  const categories = await Category.findAll();
  res.render('pages/card/create', { categories });
}

const create = (req, res) => {

}

export default {
  home,
  createRender,
  create
}