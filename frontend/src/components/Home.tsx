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


function Home() {
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
                <TableHead className="w-56">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))} */}
              <TableRow>
                <TableCell className="font-medium">Descrição 1</TableCell>
                <TableCell>10</TableCell>
                <TableCell>Alimentação</TableCell>
                <TableCell className="text-left">
                  <div className="text-white space-x-2">
                    <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-500">Excluir</Button>
                  </div>
                </TableCell>
              </TableRow>
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
              {/* {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))} */}
              <TableRow>
                <TableCell className="font-medium">Alimentação</TableCell>
                <TableCell>100</TableCell>
                <TableCell className="text-left">
                  <div className="text-white space-x-2">
                    <Link to={"/add/balance"}>
                      <Button className="bg-green-600 hover:bg-green-600">Adicionar saldo</Button>
                    </Link>
                    <Button className="bg-orange-400 hover:bg-orange-400">Editar</Button>
                    <Button className="bg-red-500 hover:bg-red-500">Excluir</Button>
                  </div>
                </TableCell>
              </TableRow>
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
