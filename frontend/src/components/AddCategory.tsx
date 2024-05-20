import { FormEvent, useState } from "react"
import InputCompoment from "./InputCompoment"
import { Button } from "./ui/button"
import { addCategory } from "@/service/api";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    name: '',
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
      await addCategory(formData.name, Number(formData.balance));
      navigate("/");
    })()
  }

  const goBack = () => {
    navigate(-1);
  }
  
  return (
    <>
      <div className='container'>        
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar categoria</h1>
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
              label="Saldo"
              htmlFor="balance"
              type="number"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
            />

            <div className="text-white pt-2 space-x-2 flex justify-end">
              <Button onClick={goBack} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Cadastrar</Button>
            </div>
          </form>

        </div>
      </div> 
    </>
  )
}

export default AddCategory
