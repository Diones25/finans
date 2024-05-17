import React, { FormEvent, useState } from 'react';
import InputCompoment from './InputCompoment';
import { Button } from './ui/button';
import { useNavigate, useParams } from "react-router-dom";
import { addBalanceCategory } from '@/service/api';

function AddBalance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    balance: ''
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
      await addBalanceCategory(id, Number(formData.balance));
      navigate("/");
    })();
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar saldo</h1>
          <form onSubmit={handleSubmit}>
            <InputCompoment
              label="Saldo"
              htmlFor="balance"
              type='text'
              id="balance"
              name='balance'
              value={Number(formData.balance)}
              onChange={handleChange}
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
