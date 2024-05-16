import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Category } from "./types/Category";
import { getAllCategories, getAllSpents } from "@/service/api";
import { Spent } from "./types/Spent";
import { formatCurrency, formateDate } from "@/lib/utils";


function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [spents, setSpents] = useState<Spent[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories)
    })();

    (async () => {
      const spents = await getAllSpents();
      setSpents(spents);
    })();
  },[])

  return (
    <>
      <div className="container">
        <div className="pb-5">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Lista de Gastos</h1>
          <Table className="border text-gray-700">
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-40">Valor</TableHead>
                <TableHead className="w-64">Categoria</TableHead>
                <TableHead className="w-64">Data</TableHead>
                <TableHead className="w-56">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spents ? (
                <>
                  {spents.map((spt) => (
                    <TableRow>
                      <TableCell className="font-medium">{ spt.description }</TableCell>
                      <TableCell>{ formatCurrency(Number(spt.value)) }</TableCell>
                      <TableCell>{ spt.category.name }</TableCell>
                      <TableCell>{formateDate(spt.createdAt) }</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2">
                          <Link to={"/edit/spent"}>
                            <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                          </Link>
                          <Button className="bg-red-500 hover:bg-red-500">Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ): (
                  <p>Sem gastos para exibição</p>
              )}              
            </TableBody>
          </Table>
          <div className="flex justify-end pt-3">
            <Link to={"/add/spent"}>
              <Button className="bg-green-600 text-white hover:bg-green-600">Adicionar gasto</Button>            
            </Link>
          </div>
        </div>

        <div className="pt-5">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Categorias</h1>
          <Table className="border text-gray-700">
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead className="w-40">Saldo</TableHead>
                <TableHead className="w-96">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories ? (
                <>
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{ cat.name }</TableCell>
                      <TableCell>{formatCurrency(Number(cat.balance)) }</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2">
                          <Link to={"/add/balance"}>
                            <Button className="bg-green-600 hover:bg-green-600">Adicionar saldo</Button>
                          </Link>
                          <Link to={"/edit/category"}>
                            <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                          </Link>
                          <Button className="bg-red-500 hover:bg-red-500">Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))}
                </>
              ) : (
                <p>Sem categorias para exibição</p>
              )}
              
            </TableBody>
          </Table>
          <div className="flex justify-end pt-3">
            <Link to={"/add/category"}>
              <Button className="bg-green-600 text-white hover:bg-green-600">Adicionar categoria</Button>
            </Link>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Home
