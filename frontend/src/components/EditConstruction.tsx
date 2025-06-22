import {  useEffect } from "react";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { editConstructionSchema } from "@/schemas/editConstructionSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConstruction } from "@/utils/queries";
import { useEditConstruction } from "@/utils/mutations";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditConstruction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const construction = useConstruction(id as string);
  const aditConstrcution = useEditConstruction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editConstructionSchema>>({
    resolver: zodResolver(editConstructionSchema)
  });

  useEffect(() => {
    if (construction.data) {
      reset({
        name: construction.data.name,
        quantity: construction.data.quantity,
        unitaryValue: construction.data.unitaryValue,
      });
    }
  }, [construction.data, reset]);

  const handleFormSubmit: SubmitHandler<z.infer<typeof editConstructionSchema>> = (data) => {
      if (!id) return;
  
      aditConstrcution.mutate(
        { id, data }, {
        onSuccess: () => {
          //Reseta o formulário
          reset();
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
              <Label htmlFor="description">Nome</Label>
              <Input
                id="description"
                {...register('name')}
                className={`border ${errors.name ? 'border-red-600' : 'border-black'} focus:outline-none`}
              />
              {errors.name &&
                <p className='text-red-600 text-sm'>{errors.name.message}</p>
              }
            </div>

            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Quantidade</Label>
              <Input
                id="description"
                {...register('quantity', { valueAsNumber: true })}
                className={`border ${errors.quantity ? 'border-red-600' : 'border-black'} focus:outline-none`}
              />
              {errors.quantity &&
                <p className='text-red-600 text-sm'>{errors.quantity.message}</p>
              }
            </div>

            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Valor Unitário</Label>
              <Input
                id="description"
                {...register('unitaryValue', { valueAsNumber: true })}
                className={`border ${errors.unitaryValue ? 'border-red-600' : 'border-black'} focus:outline-none`}
              />
              {errors.unitaryValue &&
                <p className='text-red-600 text-sm'>{errors.unitaryValue.message}</p>
              }
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/construction")} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Atualizar</Button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>
    </>
  )
}

export default EditConstruction
