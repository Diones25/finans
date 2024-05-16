import InputCompoment from './InputCompoment'
import { Button } from './ui/button'

function AddBalance() {
  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar saldo</h1>
          <form action="">
            <InputCompoment
              label="Saldo"
              htmlFor="balance"
              id="balance"
            />

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Adicionar</Button>
            </div>
          </form>

        </div>
      </div> 
    </>
  )
}

export default AddBalance
