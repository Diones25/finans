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
        const spents = await prisma.spent.findMany({
            orderBy: [
                {
                    description: 'asc'
                }
            ],
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return res.status(200).json(spents);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const listOne = async (req, res) => {
    const { id } = req.params;
    try {
        const spent = await prisma.spent.findUnique({
            where: {
                id
            }
        });
        return res.status(200).json(spent);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const addSpent = async (req, res) => {
    const { value, description, categoryId } = req.body;
    try {
        const addSpentSchema = joi_1.default.object({
            value: joi_1.default.number().required(),
            description: joi_1.default.string().required(),
            categoryId: joi_1.default.string().required()
        });
        const validation = addSpentSchema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(400).json({ message: errors });
        }
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            },
            select: {
                balance: true
            }
        });
        if (Number(category?.balance) < value) {
            return res.status(400).json({ message: 'Saldo insuficiente' });
        }
        const newBalance = Number(category?.balance) - Number(value);
        await prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                balance: newBalance
            }
        });
        const newSpent = await prisma.spent.create({
            data: {
                value,
                description,
                categoryId
            }
        });
        return res.status(200).json(newSpent);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const edit = async (req, res) => {
    const { id } = req.params;
    const { value, description, categoryId } = req.body;
    try {
        const updateSpent = await prisma.spent.update({
            where: {
                id
            },
            data: {
                value,
                description,
                categoryId
            }
        });
        return res.status(200).json(updateSpent);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.spent.delete({
            where: {
                id
            }
        });
        return res.status(200).json({ message: 'Gasto deletado com sucesso' });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
};
exports.default = {
    list,
    listOne,
    addSpent,
    edit,
    remove
};
