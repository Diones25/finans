import { Label } from "@radix-ui/react-label";
import InputCompoment from "./InputCompoment";
import { Button } from "./ui/button";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "@/types/Category";
import { editSpent, getAllCategories, getOneSpent } from "@/service/api";

function EditSpent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('');

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories)
    })();

    (async () => {
      const res = await getOneSpent(id);
      setDescription(res.description);
      setValue(res.value);
    })();
  }, [id]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    (async () => {
      await editSpent(id, description, Number(value), select);
      navigate("/");
    })();
  }

  return (
    <>
      <div className='container'>
        <div className="w-[730px]">
          <h1 className="text-3xl font-semibold text-gray-800 my-3">Editar gasto</h1>
          <form onSubmit={handleSubmit}>
            <InputCompoment
              label="Descrição"
              htmlFor="description"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <InputCompoment
              label="Valor"
              htmlFor="value"
              type="text"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="flex flex-col">
              <Label htmlFor="category">
                <span className="font-semibold">Categoria</span>
              </Label>
              <select
                className="border border-gray-600 p-2 w-[50%] mt-2"
                id="categoryId"
                name="categoryId"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option value="">Selecione uma categoria</option>
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
              <Button type="submit" className="bg-blue-600 hover:bg-blue-600">Voltar</Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-600">Atualizar</Button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default EditSpent
