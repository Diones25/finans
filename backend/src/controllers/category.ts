import { Request, Response } from 'express';
import { addBalanceCategoryShema } from '../schemas/add-balance-category';
import {
  addBalance,
  createCategory,
  findAllCategories,
  findBalance,
  findCategoryByName,
  findOneCategory,
  removeCategory,
  updateCategory
} from '../service/category';
import { addCategorySchema } from '../schemas/add-category';

const list = async (req: Request, res: Response) => {
  
  try {
    const categories = await findAllCategories();
    return res.json(categories);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const listOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findOneCategory(id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    return res.status(200).json(category);

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const create = async (req: Request, res: Response) => {

  const safeData = addCategorySchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    const existingCategory = await findCategoryByName(safeData.data.name);

    if (existingCategory) {
      return res.json({ message: "Categoria já existe" });
    }

    const newCategory = await createCategory(safeData.data.name, safeData.data.balance);

    res.status(201).json(newCategory);

  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor", error });
  }
};


const addBalanceCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const safeData = addBalanceCategoryShema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    const balanceBD = await findBalance(id);
    const newBalance = Number(balanceBD?.balance) + Number(safeData.data?.balance);
    const newBalanceCategory = await addBalance(id, newBalance);

    res.status(200).json(newBalanceCategory);
        
  } catch (error) {
    return res.status(500).json({ message: error });
  }  
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;

  const safeData = addCategorySchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    const updatedCategory = await updateCategory(id, safeData.data.name, safeData.data.balance);
    res.status(201).json(updatedCategory);
        
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const remove = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await removeCategory(id);
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default {
  list,
  listOne,
  create,
  addBalanceCategory,
  edit,
  remove
}

