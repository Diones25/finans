import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteConstruction, getAllConstruction, getListAmount } from "@/service/api";
import { formatCurrency, formateDate } from "@/lib/utils";
import { Construction } from "./types/Construction";

function Home() {
  const navigate = useNavigate();
  const [constructions, setConstructions] = useState<Construction[]>([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getAllConstruction();
      setConstructions(data)
    })();

    (async () => {
      const data = await getListAmount();
      setAmount(data)
    })();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    (async () => {
      await deleteConstruction(id);
      navigate(0);
    })();
  }

  return (
    <>
      <div className="container">
        <div className="pb-5">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Lista de Gastos</h1>
            <div className="bg-green-400 px-3 py-2 rounded-xl">
              <h5 className="text-3xl font-semibold text-white">Total: <span>{formatCurrency(amount) }</span></h5>
            </div>
          </div>
          <Table className="border text-gray-700">
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-36">Quantidade</TableHead>
                <TableHead className="w-36">Valor unitário</TableHead>
                <TableHead className="w-36">Subtotal</TableHead>
                <TableHead className="w-40">Data</TableHead>
                <TableHead className="w-64">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {constructions.length > 0 ? (
                <>
                  {constructions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitaryValue)}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{formateDate(item.createdAt)}</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2">                          
                          <Link to={`/edit/category/${item.id}`}>
                            <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                          </Link>
                          <Button className="bg-red-500 hover:bg-red-500" onClick={() => handleDeleteCategory(item.id)}>Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <p className="bg-orange-300 border border-orange-400 rounded-xl w-70 text-center text-white py-2 m-2">Sem categorias para exibição</p>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-end pt-3">
            <Link to={"/add/construction"}>
              <Button className="bg-green-600 text-white hover:bg-green-600">Adicionar gasto</Button>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home
