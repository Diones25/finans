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
import { formatCurrency, formateDate } from "@/lib/utils";
import Pagination from "./Pagination";
import { useAllConstructions, useListAmount } from "@/utils/queries";
import { useRemoveconstruction } from "@/utils/mutations";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | any>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [maxButtons, __] = useState(10);

  const {
    data,
    //isLoading,
    //isError
  } = useAllConstructions(page, pageSize);
  const { data: amount } = useListAmount();
  const removeConstruction = useRemoveconstruction();

  useEffect(() => {
    if (data) {
      setPageSize(data.pageSize);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleDeleteConstruction = async (id: string) => {
    (async () => {
      removeConstruction.mutate(id);
    })();
  }

  return (
    <>
      <div className="container">
        <div className="pb-5">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Lista de Gastos</h1>
            <div className="bg-green-400 px-3 py-2 rounded-xl">
              <h5 className="text-3xl font-semibold text-white">Total: <span>{amount?.totalValue as number > 0 ? formatCurrency(amount?.totalValue as number) : 0}</span></h5>
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
              {data?.spents.length as number > 0 ? (
                <>
                  {data?.spents.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(Number(item.unitaryValue))}</TableCell>
                      <TableCell>{formatCurrency(Number(item.amount))}</TableCell>
                      <TableCell>{formateDate(item.createdAt)}</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2">
                          <Link to={`/construction/edit/${item.id}`}>
                            <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                          </Link>
                          <Button className="bg-red-500 hover:bg-red-500" onClick={() => handleDeleteConstruction(item.id)}>Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="bg-orange-300 border border-orange-400 rounded-xl text-white py-2 m-2 inline-block">
                      Sem gastos de construção para exibição
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-end pt-3">
            <Link to={"/add/construction"}>
              <Button className="bg-green-600 text-white hover:bg-green-600">Adicionar gasto</Button>
            </Link>
          </div>
        </div>

        <Pagination
          page={page}
          maxButtons={maxButtons}
          totalPages={totalPages}
          setPage={setPage}
        />

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </>
  )
}

export default Home
