import { Button } from './ui/button';
import { useNavigate, useParams } from "react-router-dom";
import { useAddBalanceCategory } from '@/utils/mutations';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { addBalanceCategorySchema } from '@/schemas/addBalanceCategorySchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBalance() {
  const navigate = useNavigate();
  const { id } = useParams();
  const addBalanceCategory = useAddBalanceCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof addBalanceCategorySchema>>({
    resolver: zodResolver(addBalanceCategorySchema)
  })

  const handleFormSubmit: SubmitHandler<z.infer<typeof addBalanceCategorySchema>> = (data) => {
    if (!id) return;

    addBalanceCategory.mutate(
      { id, balance: data.balance },{
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
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar saldo</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-2 space-y-2">
              <Label htmlFor="description">Saldo</Label>
              <Input
                id="description"
                {...register('balance', { valueAsNumber: true })}
                className={`border ${errors.balance ? 'border-red-600' : 'border-black'} focus:outline-none`}
              />
              {errors.balance &&
                <p className='text-red-600 text-sm'>{errors.balance.message}</p>
              }
            </div>

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={() => navigate("/")}>Voltar</Button>
              <Button type="submit">Adicionar</Button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div> 
    </>
  )
}

export default AddBalance
