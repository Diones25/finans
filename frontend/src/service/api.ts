import { Category } from "@/components/types/Category";
import { Construction } from "@/components/types/Construction";
import { Spent } from "@/components/types/Spent";

const baseUrl = "http://localhost:3333"

export const getAllSpents = async (): Promise<Spent[]> => {
  const res = await fetch(`${baseUrl}/spent/all`);
  const json = res.json();
  return json;
}

export const getOneSpent = async (id: string | undefined) => {
  const res = await fetch(`${baseUrl}/spent/${id}`);
  const json = res.json();
  return json;
}

export const addSpent = async (value: number, description: string, categoryId: string) => {
  const res = await fetch(`${baseUrl}/spent/create`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      value,
      description,
      categoryId
    })
  });

  const json = res.json();
  return json;
}

export const editSpent = async (id: string | undefined, description: string, value: number, categoryId: string) => {
  const res = await fetch(`${baseUrl}/spent/update/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      description,
      value,
      categoryId
    })
  });

  const json = res.json();
  return json;
}

export const deleteSpent = async (id: string) => {
  const res = await fetch(`${baseUrl}/spent/remove/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const json = res.json();
  return json;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${baseUrl}/category/list`);
  const json = res.json();    
  return json;
}

export const getOneCategory = async (id: string | undefined) => {
  const res = await fetch(`${baseUrl}/category/${id}`);
  const json = res.json();
  return json;
}

export const addCategory = async (name: string, balance: number) => {
  const res = await fetch(`${baseUrl}/category/create`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name,
      balance
    })
  });

  const json = res.json();
  return json;
}

export const addBalanceCategory = async (id: string | undefined, balance: number) => {
  const res = await fetch(`${baseUrl}/category/add/balance/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      balance
    })
  });

  const json = res.json();
  return json;
}

export const editCategory = async (id: string | undefined, name: string, balance: string) => {
  const res = await fetch(`${baseUrl}/category/edit/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name,
      balance
    })
  });

  const json = res.json();
  return json;
}

export const deleteCategory = async (id: string) => {
  const res = await fetch(`${baseUrl}/category/remove/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const json = res.json();
  return json;
}

export const getAllConstruction = async (): Promise<Construction[]> => {
  const res = await fetch(`${baseUrl}/construction/all`);
  const json = res.json();
  return json;
}

export const getOneConstruction = async (id: string | undefined) => {
  const res = await fetch(`${baseUrl}/construction/${id}`);
  const json = res.json();
  return json;
}

export const getListAmount = async () => {
  const res = await fetch(`${baseUrl}/construction/list/amount`);
  const json = res.json();
  return json;
}

export const addConstruction = async (name: string, quantity: number, unitaryValue: number) => {
  const res = await fetch(`${baseUrl}/construction/create`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name,
      quantity,
      unitaryValue
    })
  });

  const json = res.json();
  return json;
}

export const editConstruction = async (id: string | undefined, name: string, quantity: number, unitaryValue: number) => {
  const res = await fetch(`${baseUrl}/construction/edit/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      name,
      quantity,
      unitaryValue
    })
  });

  const json = res.json();
  return json;
}

export const deleteConstruction = async (id: string) => {
  const res = await fetch(`${baseUrl}/construction/remove/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const json = res.json();
  return json;
}