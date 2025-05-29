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
import { Category } from "./types/Category";
import { deleteCategory, deleteSpent, getAllCategories, getAllSpents } from "@/service/api";
import { Spent } from "./types/Spent";
import { formatCurrency, formateDate } from "@/lib/utils";
import Pagination from "./Pagination";

function Home() {
  const navigate = useNavigate(); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<Spent>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | any>(null);
  const [totalPages, setTotalPages] = useState<number | any>(null);
  const [maxButtons, __] = useState(10);

  //Usar os states categories e spents dentro do array [] do useEffect faz com que
  //o fect ou axios fiquem dando multiplas requisições pendentes no back-end
  //fazendo a aplicação consumir muito processamento e memória.
  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories)
    })();

    (async () => {
      const response = await getAllSpents(page, pageSize);
      setData(response);
      setPageSize(response.pageSize);
      setTotalPages(response.totalPages);
    })();
  }, [page, pageSize]);

  //O navigate(0) faz com que o React Router navegue para a rota atual, forçando um reload na tela, uma
  //atualização do componente associado a essa rota.
  const handleDeleteCategory = async (id: string) => {
    (async () => {
      await deleteCategory(id);
      navigate(0);
    })();
  }

  const handleDeleteSpent = (id: string) => {
    (async () => {
      await deleteSpent(id);      
      navigate(0)      
    })();
  }

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
                          <Button className="bg-red-500 hover:bg-red-500" onClick={() => handleDeleteSpent(spt.id)}>Excluir</Button>
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
              {categories.length > 0 ? (
                <>
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{ cat.name }</TableCell>
                      <TableCell>{formatCurrency(Number(cat.balance)) }</TableCell>
                      <TableCell className="text-left">
                        <div className="text-white space-x-2">
                          <Link to={`/add/balance/${cat.id}`}>
                            <Button className="bg-green-600 hover:bg-green-600">Adicionar saldo</Button>
                          </Link>
                          <Link to={`/edit/category/${cat.id}`}>
                            <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                          </Link>
                          <Button className="bg-red-500 hover:bg-red-500" onClick={() => handleDeleteCategory(cat.id)}>Excluir</Button>
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
              <Button className="bg-green-600 text-white hover:bg-green-600">Adicionar categoria</Button>
            </Link>
          </div>
        </div>
      </div> 
    </>
  )
}

export default Home
