import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { addSpent } from "@/service/api";
import { useNavigate } from 'react-router-dom';
import { useCategories } from "@/utils/queries";
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from "./ui/input";
import { addSpentSchema } from "@/schemas/addSpentSchema";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSpent() {
  const navigate = useNavigate();

  const {
    data: categories
  } = useCategories();

  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addSpentSchema>>({
    resolver: zodResolver(addSpentSchema)
  })

  const { mutate, isPending, reset } = useMutation({
    mutationFn: addSpent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-spents'],
      });
      //Reseta o formulário
      reset();
      setTimeout(() => navigate('/'), 2000); // Dá tempo para o toast aparecer //Remover o navigate se eu for utilizar o modal
      toast.success('Gasto cadastrado com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar gasto: ${error.message}`);
    },
  });

  const handleFormSubmit: SubmitHandler<z.infer<typeof addSpentSchema>> = (data) => {
    mutate(data);
    console.log(data)
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar gasto do cartão</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                {...register('description')}
                className={`border ${errors.description ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
              />
              {errors.description &&
                <p className='text-red-600 text-sm'>{errors.description.message}</p>
              }
            </div> 

            <div className="mb-2 space-y-2">
              <Label htmlFor="Valor">Valor</Label>
              <Input
                id="Valor"
                {...register('value', { valueAsNumber: true })}
                className={`border ${errors.value ? 'border-red-600' : 'border-black'} text-black focus:outline-none`}
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
                <option value="">Selecione a categoria</option>
                {categories ? (
                  <>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </>
                ) : (
                  <option>Sem categorias a serem demonstradas</option>
                )}
              </select>
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">
                {isPending ? 'Cadastrando...' : 'Cadastrar Gasto'}
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
