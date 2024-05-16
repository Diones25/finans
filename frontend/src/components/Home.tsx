import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"


function Home() {
  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-bold text-red-400">Tabela de testes</h1>
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
      </div> 
    </>
  )
}

export default Home
