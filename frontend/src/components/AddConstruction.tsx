import { useState } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { useAddConstruction } from '@/utils/mutations';
import { addConstructionSchema } from '@/schemas/addConstructionSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { NumericFormat } from 'react-number-format';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddConstruction() {
  const [formattedValue, setFormattedValue] = useState("");
  const navigate = useNavigate();
  const addConstruction = useAddConstruction();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof addConstructionSchema>>({
    resolver: zodResolver(addConstructionSchema)
  })

  const handleFormSubmit: SubmitHandler<z.infer<typeof addConstructionSchema>> = (data) => {
    const convertedValue = parseFloat(formattedValue.replace(',', '.'));

    addConstruction.mutate(
      { ...data, unitaryValue: convertedValue },
      {
        onSuccess: () => {
          //Reseta o formulário
          reset();
          setFormattedValue("");
        },
      });
  }
  
  return (
    <>
      <div className='container mx-auto'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar gasto de construção</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-2 space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register('name')}
                className={`border ${errors.name ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.name &&
                <p className='text-red-600 text-sm'>{errors.name.message}</p>
              }
            </div>

            <div className="mb-2 space-y-2">
              <Label htmlFor="name">Quantidade</Label>
              <Input
                id="quantity"
                {...register('quantity', { valueAsNumber: true, })}
                className={`border ${errors.quantity ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.quantity &&
                <p className='text-red-600 text-sm'>{errors.quantity.message}</p>
              }
            </div>

            <div className="mb-2 space-y-2">
              <Label htmlFor="unitaryValue">Valor Unitário</Label>
              <NumericFormat
                id="unitaryValue"
                value={formattedValue}
                decimalSeparator=","
                thousandSeparator="."
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                customInput={Input}
                onValueChange={(values) => {
                  setFormattedValue(values.value);
                  setValue("unitaryValue", parseFloat(values.value.replace(',', '.')));
                }}
                className={`border ${errors.unitaryValue ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.unitaryValue &&
                <p className='text-red-600 text-sm'>{errors.unitaryValue.message}</p>
              }
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/construction")} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Cadastrar</Button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>
    </>
  )
}

export default AddConstruction
