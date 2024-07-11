"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const spentController_1 = __importDefault(require("../controllers/spentController"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const constructionController_1 = __importDefault(require("../controllers/constructionController"));
const router = (0, express_1.Router)();
//Rotas de categorias
router.get('/category/list', categoryController_1.default.list);
router.get('/category/:id', categoryController_1.default.listOne);
router.post('/category/create', categoryController_1.default.create);
router.put('/category/add/balance/:id', categoryController_1.default.addBalanceCategory);
router.put('/category/edit/:id', categoryController_1.default.edit);
router.delete('/category/remove/:id', categoryController_1.default.remove);
//Rotas de gastos
router.get('/spent/all', spentController_1.default.list);
router.get('/spent/:id', spentController_1.default.listOne);
router.post('/spent/create', spentController_1.default.addSpent);
router.put('/spent/update/:id', spentController_1.default.edit);
router.delete('/spent/remove/:id', spentController_1.default.remove);
//rotas construction
router.get('/construction/all', constructionController_1.default.list);
router.get('/construction/:id', constructionController_1.default.listOne);
router.get('/construction/list/amount', constructionController_1.default.getAmount);
router.post('/construction/create', constructionController_1.default.create);
router.put('/construction/edit/:id', constructionController_1.default.edit);
router.delete('/construction/remove/:id', constructionController_1.default.remove);
exports.default = router;
