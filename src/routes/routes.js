import { Router } from'express';
import cardController from'../controllers/cardController.js';
import categoryController from '../controllers/categoryController.js'
import balanceController from '../controllers/balanceController.js';

const router = Router();

router.get('/spents/all', cardController.home); 
router.get('/spents/render/create', cardController.createRender);
router.get('/cat/render/create', categoryController.createRender);
router.get('/balance/render/create', balanceController.createRender);

router.post('/spents/add', cardController.create); 
router.post('/cat/add', categoryController.create); 
router.post('/balance/add', balanceController.create); 

export default router;