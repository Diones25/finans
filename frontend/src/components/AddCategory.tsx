import { FormEvent, useState } from "react"
import InputCompoment from "./InputCompoment"
import { Button } from "./ui/button"
import { addCategory } from "@/service/api";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [ name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    (async () => {
      await addCategory(name, balance);
      navigate("/");
    })()
  }
  
  return (
    <>
      <div className='container'>        
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar categoria</h1>
          <form onSubmit={handleSubmit}>
            <InputCompoment
              label="Nome"
              htmlFor="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />

            <InputCompoment
              label="Saldo"
              htmlFor="balance"
              id="balance"
              onChange={(e) => setBalance(Number(e.target.value))}
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
