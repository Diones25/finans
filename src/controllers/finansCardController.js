import Category from '../models/Category.js';

const listSpendRender = (req, res) => {
  res.render('pages/home');
}

const createSpendRender = (req, res) => {
  res.render('pages/createSpend');
}

const createCatRender = (req, res) => {
  res.render('pages/createCat');  
}

const createSpend = (req, res) => {

}

const createCat = async (req, res) => {
  const { name } = req.body;
  
  try {
    // const caterory = await Category.findOne({
    //   where: {
    //     name: name
    //   }
    // });
    
    // if(caterory) {
    //   console.log('Categoria já existe');
      
    // }
    // else {
    //   console.log('Categoria não existe')
    // }

  } catch (error) {
    
  }
}

export default {
  listSpendRender,
  createSpendRender,
  createCatRender,
  createSpend,
  createCat
}