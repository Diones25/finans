import { Request, Response } from 'express';
import {
  constructionAmount,
  createConstruction,
  deleteConstrcution,
  listAllConstruction,
  listOneConstruction,
  totalConstructionsCount,
  updateConstruction
} from "../service/construction";
import { listConstructionSchema } from '../schemas/list-construction';
import { addConstructionSchema } from '../schemas/add-construction';

const list = async (req: Request, res: Response) => {

  /*
    A linha const skip = (page - 1) * pageSize; é usada para calcular quantos registros (usuários, no caso do exemplo) 
    devem ser ignorados (skip) ao buscar dados de uma base de dados, para implementar a paginação.

    Explicação Detalhada
    Vamos entender essa linha no contexto da paginação:

    page: Representa o número da página atual. Por exemplo, se page for 1, isso significa que estamos na primeira página, se for 2, estamos na segunda página, e assim por diante.
    pageSize: Representa a quantidade de registros que você deseja mostrar por página. Por exemplo, se pageSize for 10, isso significa que você quer listar 10 registros por página.
    Cálculo do skip
    Para a primeira página (page = 1), queremos começar do primeiro registro, então skip deve ser 0. Portanto, (1 - 1) * pageSize é igual a 0 * pageSize, que é 0.
    Para a segunda página (page = 2), queremos ignorar os primeiros pageSize registros, então skip deve ser pageSize. Portanto, (2 - 1) * pageSize é igual a 1 * pageSize, que é pageSize.
    Para a terceira página (page = 3), queremos ignorar os primeiros 2 * pageSize registros, então skip deve ser 2 * pageSize. Portanto, (3 - 1) * pageSize é igual a 2 * pageSize.
    Exemplos Práticos
    Suponha que pageSize seja 10:

    Primeira página (page = 1):

    skip = (1 - 1) * 10 = 0 * 10 = 0
    Nenhum registro será ignorado, ou seja, começamos do primeiro registro.
    Segunda página (page = 2):

    skip = (2 - 1) * 10 = 1 * 10 = 10
    Os primeiros 10 registros serão ignorados, começamos do 11º registro.
    Terceira página (page = 3):

    skip = (3 - 1) * 10 = 2 * 10 = 20
    Os primeiros 20 registros serão ignorados, começamos do 21º registro.
    Finalidade
    A finalidade dessa linha é garantir que cada página de resultados contenha o número correto de registros, e que ao navegar para a próxima página, os registros anteriores sejam ignorados adequadamente para exibir os novos registros correspondentes àquela página.
  */
  
  const safeData = listConstructionSchema.safeParse(req.query);
  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    let page = Number(req?.query?.page) || 1;
    let pageSize = Number(req?.query?.pageSize) || 5;

    if (page < 0) {
      page = 1;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const constructions = await listAllConstruction(skip, take);

    const totalConstructions = await totalConstructionsCount();

    const totalPages = Math.ceil(totalConstructions / pageSize);

    const data = {
      constructions,
      totalConstructions,
      totalPages,
      pageSize: pageSize,
      page: page
    }

    return res.status(200).json(data); 
  } catch (error) {
    return res.status(500).json({ message: error });
  } 
}

const listOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const construction = await listOneConstruction(id);

    if (!construction) {
      return res.status(404).json({ message: "Gasto não encontrado" });
    }
  
    return res.status(200).json(construction);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const create = async (req: Request, res: Response) => {
  const safeData = addConstructionSchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {

    const amount = safeData.data.quantity * safeData.data.unitaryValue;
    const newConstruction = await createConstruction(safeData.data.name, safeData.data.quantity, safeData.data.unitaryValue, amount)

    return res.status(201).json(newConstruction);
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const getAmount = async (req: Request, res: Response) => {
  try {
    const constructions = await constructionAmount();

    const nums = constructions.map((item) => {
      return item.amount
    });

    const amount = nums.reduce((acumulator, element) => Number(acumulator) + Number(element), 0);

    return res.status(200).json(amount)

  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id === ":id") {
    return res.status(400).json({ message: "Id é obrigatório" });
  }

  const safeData = addConstructionSchema.safeParse(req.body);

  if (!safeData.success) {
    return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
  }

  try {
    const newAmount = safeData.data.quantity * safeData.data.unitaryValue;
    const update = await updateConstruction(id, safeData.data.name, safeData.data.quantity, safeData.data.unitaryValue, newAmount);
    return res.status(200).json(update);
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id === ":id") {
    return res.status(400).json({ message: "Id é obrigatório" });
  }

  try {
    await deleteConstrcution(id);
    return res.status(200).json({ message: 'Gasto deletado com sucesso' });
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default {
  list,
  listOne,
  create,
  getAmount,
  edit,
  remove
}