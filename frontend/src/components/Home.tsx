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
import { useAllSpents, useCategories } from "@/utils/queries";
import { useRemoveCategory, useRemoveSpent } from "@/utils/mutations";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | any>(null);
  const [totalPages, setTotalPages] = useState<number | any>(null);
  const [maxButtons, __] = useState(10);

  const { data } = useAllSpents(page, pageSize);
  const {
    data: categoriesData,
    //isLoading: isLoadingCategories,
    //isError: isErrorCategories
  } = useCategories();

  const removeSpent = useRemoveSpent();
  const removeCategory = useRemoveCategory();

  useEffect(() => {
    if (data) {
      setPageSize(data.pageSize);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleDeleteCategory = async (id: string) => {
    (async () => {
      removeCategory.mutate(id);
    })();
  }

  const handleDeleteSpent = (id: string) => {
    (async () => {
      removeSpent.mutate(id);           
    })();
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="pb-5">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Lista de Gastos</h1>
          <Table className="border text-gray-700">
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-40">Valor</TableHead>
                <TableHead className="w-64">Categoria</TableHead>
                <TableHead className="w-64">Data</TableHead>
                <TableHead className="w-56">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.spents?.length as number > 0 ? (
                <>
                  {data?.spents.map((spt) => (
                    <TableRow key={spt.id}>
                      <TableCell className="font-medium">{ spt.description }</TableCell>
                      <TableCell>{ formatCurrency(Number(spt.value)) }</TableCell>
                      <TableCell>{ spt.category.name }</TableCell>
                      <TableCell>{formateDate(spt.createdAt) }</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2 flex justify-end">
                          {/*Não faz sentido por enquanto ter uma edição de gasto*/}
                          {/* <Link to={`/edit/spent/${spt.id}`}>
                            <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                          </Link> */}
                          <Button onClick={() => handleDeleteSpent(spt.id)}>Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ): (
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
            <Link to={"/add/spent"}>
              <Button>Adicionar gasto</Button>            
            </Link>
          </div>
        </div>

        <Pagination
          page={page}
          maxButtons={maxButtons}
          totalPages={totalPages}
          setPage={setPage}
        />

        <div className="pt-5">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Categorias</h1>
          <Table className="border text-gray-700">
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead className="w-40">Saldo</TableHead>
                <TableHead className="w-96">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoriesData && categoriesData.length > 0 ? (
                <>
                  {categoriesData.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{ cat.name }</TableCell>
                      <TableCell>{formatCurrency(Number(cat.balance)) }</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2">
                          <Link to={`/add/balance/${cat.id}`}>
                            <Button>Adicionar saldo</Button>
                          </Link>
                          <Link to={`/edit/category/${cat.id}`}>
                            <Button>Editar</Button>
                          </Link>
                          <Button onClick={() => handleDeleteCategory(cat.id)}>Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="bg-orange-300 border border-orange-400 rounded-xl text-white py-2 m-2 inline-block">
                      Sem categorias para exibição
                    </p>
                  </TableCell>
                </TableRow>
              )}
              
            </TableBody>
          </Table>
          <div className="flex justify-end py-3">
            <Link to={"/add/category"}>
              <Button>Adicionar categoria</Button>
            </Link>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div> 
    </>
  )
}

export default Home
