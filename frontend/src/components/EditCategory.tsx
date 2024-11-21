import { FormEvent, useEffect, useState } from "react";
import InputCompoment from "./InputCompoment";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { editCategory, getOneCategory } from "@/service/api";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getOneCategory(id);
      setName(res.name);
      setBalance(res.balance);
    })();
  }, [id]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    (async () => {
      await editCategory(id, name, Number(balance));
      navigate("/");
    })()
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Editar categoria</h1>
          <form onSubmit={handleSubmit}>
            <InputCompoment
              label="Nome"
              htmlFor="name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputCompoment
              label="Saldo"
              htmlFor="balance"
              type="text"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Atualizar</Button>
            </div>
          </form>

        </div>
      </div>  
    </>
  )
}

export default EditCategory
