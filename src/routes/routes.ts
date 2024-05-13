import { Router } from'express';
import cardController from'../controllers/cardController';
import categoryController from '../controllers/categoryController'
import balanceController from '../controllers/balanceController';

const router = Router();

router.get('/spents/all', cardController.home); 
router.get('/spents/render/create', cardController.createRender);
router.get('/cat/render/create', categoryController.createRender);
router.get('/balance/render/create', balanceController.createRender);

router.post('/spents/add', cardController.create); 
router.post('/cat/add', categoryController.createCategory); 
router.post('/balance/add', balanceController.create); 

export default router;