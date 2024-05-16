import InputCompoment from "./InputCompoment"
import { Button } from "./ui/button"

function AddCategory() {
  return (
    <>
      <div className='container'>        
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar categoria</h1>
          <form action="">
            <InputCompoment
              label="Nome"
              htmlFor="name"
              id="name"
            />

            <InputCompoment
              label="Saldo"
              htmlFor="balance"
              id="balance"
            />

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

export default AddCategory
