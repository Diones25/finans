import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';
import { useCategories } from "@/utils/queries";
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Input } from "./ui/input";
import { addSpentSchema } from "@/schemas/addSpentSchema";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddSpent } from "@/utils/mutations";
import { NumericFormat } from 'react-number-format';
import { useState } from "react";

function AddSpent() {
  const [formattedValue, setFormattedValue] = useState("");
  const navigate = useNavigate();
  const addSpent = useAddSpent();

  const {
    data: categories
  } = useCategories();

  const { 
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof addSpentSchema>>({
    resolver: zodResolver(addSpentSchema)
  })

  const handleFormSubmit: SubmitHandler<z.infer<typeof addSpentSchema>> = (data) => {
    const convertedValue = parseFloat(formattedValue.replace(',', '.'));

    addSpent.mutate(
      { ...data, value: convertedValue },
      {
        onSuccess: () => {
        //Reseta o formulário
        reset();
        setFormattedValue(""); //Limpa o campo de valor após o envio
      },
    });
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar gasto do cartão</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                {...register('description')}
                className={`border ${errors.description ? 'border-red-600' : 'border-black'} focus:outline-none`}
              />
              {errors.description &&
                <p className='text-red-600 text-sm'>{errors.description.message}</p>
              }
            </div> 

            <div className="mb-2 space-y-2">
              <Label htmlFor="Valor">Valor</Label>
              <NumericFormat
                id="valor"
                value={formattedValue}
                decimalSeparator=","
                thousandSeparator="."
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                customInput={Input}
                onValueChange={(values) => {
                  setFormattedValue(values.value);
                  setValue("value", parseFloat(values.value.replace(',', '.')));
                }}
                className={`border ${errors.value ? 'border-red-600' : 'border-black'} focus:outline-none`}
              />
              {errors.value &&
                <p className='text-red-600 text-sm'>{errors.value.message}</p>
              }
            </div>

            <div className="flex flex-col">
              <Label htmlFor="category">Categoria</Label>
              <select
                className={`border ${errors.categoryId ? 'border-red-600' : 'border-gray-600'}  p-2 w-[50%] mt-2`}
                {...register('categoryId')}
              >
                <option value="" className="text-black">Selecione a categoria</option>
                {categories ? (
                  <>
                    {categories.map((cat) => (
                      <option className="text-black" key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </>
                ) : (
                  <option>Sem categorias a serem demonstradas</option>
                )}
              </select>
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/")} >Voltar</Button>
              <Button type="submit">
                {addSpent.isPending ? 'Cadastrando...' : 'Cadastrar Gasto'}
              </Button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>
    </>
  )
}

export default AddSpent
