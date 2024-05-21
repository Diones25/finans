import React, { FormEvent, useState } from 'react'
import InputCompoment from './InputCompoment'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { addConstruction } from '@/service/api';

function AddConstruction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unitaryValue: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    (async () => {
      await addConstruction(formData.name, Number(formData.quantity), Number(formData.unitaryValue));
      navigate("/construction");
    })();
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
              value={formData.name}
              onChange={handleChange}
            />

            <InputCompoment
              label="Quantidade"
              htmlFor="quantity"
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

            <InputCompoment
              label="Valor Unitário"
              htmlFor="unitaryValue"
              type="number"
              id="unitaryValue"
              name="unitaryValue"
              value={formData.unitaryValue}
              onChange={handleChange}
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

export default AddConstruction
