import Category from '../models/Category.js';

const  createRender = (req, res) => {
  res.render('pages/category/create');
}

const create = async (req, res) => {
  const { name } = req.body;
  
  try {
    const category = await Category.findOne({
      where: {
        name: name
      }
    });
    
    if(category) {
      console.log('Categoria já existe');
      res.redirect('/cat/render/create');
    }
    else {
      console.log('Categoria não existe')
      await Category.create({ name });
      res.redirect('/spents/all');
    }

  } catch (error) {
    
  }
}

export default {
  createRender,
  create
}