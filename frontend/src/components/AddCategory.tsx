import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";
import { useAddCategory } from "@/utils/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { addCategorySchema } from "@/schemas/addCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NumericFormat } from 'react-number-format';
import { useState } from "react";

function AddCategory() {
  const [formattedValue, setFormattedValue] = useState("");
  const navigate = useNavigate();
  const addCategory = useAddCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema)
  })

  const handleFormSubmit: SubmitHandler<z.infer<typeof addCategorySchema>> = (data) => {
    const convertedValue = parseFloat(formattedValue.replace(',', '.'));

    addCategory.mutate(
      { ...data, balance: convertedValue },
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
      <div className='container'>        
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar categoria</h1>
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
              <Label htmlFor="balance">Saldo</Label>
              <NumericFormat
                id="balance"
                value={formattedValue}
                decimalSeparator=","
                thousandSeparator="."
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                customInput={Input}
                onValueChange={(values) => {
                  setFormattedValue(values.value);
                  setValue("balance", parseFloat(values.value.replace(',', '.')));
                }}
                className={`border ${errors.balance ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.balance &&
                <p className='text-red-600 text-sm'>{errors.balance.message}</p>
              }
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Cadastrar</Button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div> 
    </>
  )
}

export default AddCategory
