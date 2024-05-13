import { Router } from'express';
import cardController from'../controllers/cardController';

const router = Router();

router.get('/spents/all', cardController.home); 
router.get('/spents/render/create', cardController.pageSpents);
router.get('/category/create', cardController.pageCreateCategory);
router.get('/cat/render/add/balance/category/:id', cardController.pageAddCategoryBalance);

router.post('/cat/add', cardController.createCategory);  
router.post('/cat/add/balance', cardController.addBalanceCategory);  
router.post('/cat/edit/:id', cardController.editCategory);  
router.post('/cat/delete/:id', cardController.deleteCategory);  

export default router;