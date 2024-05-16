import { Label } from "@radix-ui/react-label"
import InputCompoment from "./InputCompoment"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button"

function EditCategory() {
  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Editar gasto</h1>
          <form action="">
            <InputCompoment
              label="Descrição"
              htmlFor="description"
              id="description"
            />

            <InputCompoment
              label="Valor"
              htmlFor="value"
              id="value"
            />

            <div className="mb-2 space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Cadastrar</Button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default EditCategory
