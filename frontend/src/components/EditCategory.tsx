import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useEditCategory } from "@/utils/mutations";
import { useCategory } from "@/utils/queries";
import { editCategorySchema } from "@/schemas/editCategorySchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const category = useCategory(id as string);
  const aditCategory = useEditCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editCategorySchema>>({
    resolver: zodResolver(editCategorySchema)
  })

  useEffect(() => {
    if (category.data) {
      reset({
        name: category.data.name,
        balance: category.data.balance,
      });
    }
  }, [category.data, reset]);
  

  const handleFormSubmit: SubmitHandler<z.infer<typeof editCategorySchema>> = (data) => {
    if (!id) return;

    aditCategory.mutate(
      { id, data }, {
      onSuccess: () => {
        //Reseta o formulário
        reset();
      },
    });
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Editar categoria</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Nome</Label>
              <Input
                id="description"
                {...register('name')}
                className={`border ${errors.name ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.name &&
                <p className='text-red-600 text-sm'>{errors.name.message}</p>
              }
            </div>

            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Saldo</Label>
              <Input
                id="description"
                {...register('balance', { valueAsNumber: true })}
                className={`border ${errors.balance ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.balance &&
                <p className='text-red-600 text-sm'>{errors.balance.message}</p>
              }
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Atualizar</Button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>  
    </>
  )
}

export default EditCategory
