import { Router } from'express';
import cardController from '../controllers/cardController';
import categoryController from '../controllers/categoryController';

const router = Router();

//Rotas de categorias
router.get('/category/list', categoryController.list);
router.post('/category/create', categoryController.create);  
router.put('/category/add/balance/:id', categoryController.addBalanceCategory);  
router.put('/category/edit/:id', categoryController.edit);  
router.delete('/category/remove/:id', categoryController.remove); 

//Rotas de gastos

export default router;