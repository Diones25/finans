import { Router } from'express';
import spentController from '../controllers/spentController';
import categoryController from '../controllers/categoryController';

const router = Router();

//Rotas de categorias
router.get('/category/list', categoryController.list);
router.post('/category/create', categoryController.create);  
router.put('/category/add/balance/:id', categoryController.addBalanceCategory);  
router.put('/category/edit/:id', categoryController.edit);  
router.delete('/category/remove/:id', categoryController.remove); 

//Rotas de gastos
router.get('/spent/all', spentController.list);
router.post('/spent/create', spentController.addSpent);
router.put('/spent/update/:id', spentController.edit);
router.delete('/spent/remove/:id', spentController.remove);

export default router;