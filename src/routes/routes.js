import { Router } from'express';
import finansCardController from'../controllers/finansCardController.js';

const router = Router();

router.get('/spents/all', finansCardController.listSpendRender); 
router.get('/spents/list/create', finansCardController.createSpendRender);
router.get('/cat/list/create', finansCardController.createCatRender);

router.post('/spents/add', finansCardController.createSpend); 
router.post('/cat/add', finansCardController.createCat); 

export default router;