"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const prisma = new client_1.PrismaClient();
const list = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: [
                {
                    name: 'asc'
                }
            ]
        });
        return res.json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const listOne = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const create = async (req, res) => {
    const { name, balance } = req.body;
    try {
        const existingCategory = await prisma.category.findFirst({
            where: {
                name
            }
        });
        if (existingCategory) {
            res.json({ message: "Categoria já existe" });
        }
        else {
            const schemaValidator = joi_1.default.object({
                name: joi_1.default.string().required(),
                balance: joi_1.default.number().required()
            });
            const validation = schemaValidator.validate(req.body, { abortEarly: false });
            if (validation.error) {
                const errors = validation.error.details.map(detail => detail.message);
                return res.status(400).json({ message: errors });
            }
            const newCategory = await prisma.category.create({
                data: {
                    name,
                    balance
                }
            });
            res.status(201).json(newCategory);
        }
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const addBalanceCategory = async (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;
    try {
        const balanceBD = await prisma.category.findUnique({
            where: {
                id
            },
            select: {
                balance: true
            }
        });
        const newBalance = Number(balanceBD?.balance) + Number(balance);
        const schemaValidator = joi_1.default.object({
            balance: joi_1.default.number().required()
        });
        const validation = schemaValidator.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(400).json({ message: errors });
        }
        const newBalanceCategory = await prisma.category.update({
            data: {
                balance: newBalance
            },
            where: {
                id
            }
        });
        res.status(200).json(newBalanceCategory);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const edit = async (req, res) => {
    const { id } = req.params;
    const { name, balance } = req.body;
    try {
        const schemaValidator = joi_1.default.object({
            name: joi_1.default.string().required(),
            balance: joi_1.default.number().required()
        });
        const validation = schemaValidator.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(400).json({ message: errors });
        }
        const updateCategory = await prisma.category.update({
            where: {
                id
            },
            data: {
                name,
                balance
            }
        });
        res.status(201).json(updateCategory);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({
            where: {
                id
            }
        });
        return res.status(200).json({ message: "Categoria deletada com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
exports.default = {
    list,
    listOne,
    create,
    addBalanceCategory,
    edit,
    remove
};
