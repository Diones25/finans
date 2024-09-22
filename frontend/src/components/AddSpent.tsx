import InputCompoment from "./InputCompoment";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { FormEvent, useEffect, useState } from "react";
import { Category } from "./types/Category";
import { addSpent, getAllCategories } from "@/service/api";
import { useNavigate } from 'react-router-dom';

function AddSpent() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [select, setSelect] = useState('');
  const [formData, setFormData] = useState({
    value: '',
    description: ''
  });

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories)
    })();
  }, []);

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
      await addSpent(Number(formData.value), formData.description, select);
      navigate("/");
    })();
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
        <h1 className="text-3xl font-semibold text-gray-800 my-3">Adicionar gasto do cartão</h1>
        <form onSubmit={handleSubmit}>
          <InputCompoment
            label="Descrição"
            htmlFor="description"
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <InputCompoment
            label="Valor"
            htmlFor="value"
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />

          <div className="flex flex-col">
              <Label htmlFor="category">Categoria</Label>
              <select
                className="border border-gray-600 p-2 w-[50%] mt-2"
                id="categoryId"
                name="categoryId"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option value="">Selecione a categoria</option>
                {categories ? (
                  <>
                    {categories.map((cat) => (                      
                      <option value={cat.id}>{cat.name}</option>
                    ))}
                  </>
                ) : (
                  <p>Sem categorias a serem demonstradas</p>
                )}
              </select>
          </div>

          <div className="text-white pt-2 space-x-2 flex justify-end">
            <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-600">Cadastrar</Button>
          </div>
        </form>

        </div>
      </div>
    </>
  )
}

export default AddSpent
