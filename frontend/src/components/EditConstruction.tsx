import { FormEvent, useEffect, useState } from "react";
import InputCompoment from "./InputCompoment";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { editConstruction, getOneConstruction } from "@/service/api";

function EditConstruction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitaryValue, setUnitaryValue] = useState('');

  useEffect(() => {
    (async () => {
      const res = await getOneConstruction(id);
      setName(res.name);
      setQuantity(res.quantity);
      setUnitaryValue(res.unitaryValue);
    })();
  }, [id]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    (async () => {
      await editConstruction(id, name, Number(quantity), Number(unitaryValue));
      navigate("/construction");
    })()
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar gasto de construção</h1>
          <form onSubmit={handleSubmit}>
            <InputCompoment
              label="Nome"
              htmlFor="name"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputCompoment
              label="Quantidade"
              htmlFor="quantity"
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <InputCompoment
              label="Valor Unitário"
              htmlFor="unitaryValue"
              type="number"
              id="unitaryValue"
              name="unitaryValue"
              value={unitaryValue}
              onChange={(e) => setUnitaryValue(e.target.value)}
            />

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Cadastrar</Button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default EditConstruction
