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
import { CreditCard, Tag } from "lucide-react";

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
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof addSpentSchema>>({
    resolver: zodResolver(addSpentSchema)
  })

  const descriptionValue = watch("description");
  const categoryIdValue = watch("categoryId");
  const selectedCategoryName =
    categories?.find((c) => c.id === categoryIdValue)?.name ?? "";

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
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold tracking-tight">Adicionar gasto</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Registre um gasto do cartão e associe a uma categoria.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Ex: Mercado, Uber, Farmácia"
                  {...register("description")}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description ? (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Use um texto curto para facilitar a busca.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    R$
                  </span>
                  <NumericFormat
                    id="value"
                    value={formattedValue}
                    decimalSeparator=","
                    thousandSeparator="."
                    allowNegative={false}
                    decimalScale={2}
                    fixedDecimalScale
                    customInput={Input}
                    onValueChange={(values) => {
                      setFormattedValue(values.value);
                      setValue(
                        "value",
                        parseFloat(values.value.replace(",", ".")),
                        { shouldValidate: true }
                      );
                    }}
                    {...register("value", { valueAsNumber: true })}
                    className={`pl-10 ${errors.value ? "border-destructive" : ""}`}
                    placeholder="0,00"
                  />
                </div>
                {errors.value && (
                  <p className="text-sm text-destructive">{errors.value.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="categoryId">Categoria</Label>
                  {Array.isArray(categories) && categories.length === 0 && (
                    <span className="text-xs text-muted-foreground">
                      Você ainda não tem categorias.
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="categoryId"
                    className={`h-9 w-full rounded-md border bg-background px-3 py-1 pl-9 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${
                      errors.categoryId ? "border-destructive" : "border-input"
                    }`}
                    {...register("categoryId")}
                  >
                    <option value="">Selecione a categoria</option>
                    {categories ? (
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Carregando categorias...</option>
                    )}
                  </select>
                </div>
                {errors.categoryId && (
                  <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="hidden sm:block">
                  <p className="text-xs text-muted-foreground">Preview</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-2.5 py-1 text-xs">
                      {descriptionValue?.trim() || "Novo gasto"}
                    </span>
                    {selectedCategoryName && (
                      <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary ring-1 ring-inset ring-primary/25">
                        {selectedCategoryName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-auto flex gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/")}
                  >
                    Voltar
                  </Button>
                  <Button type="submit" disabled={addSpent.isPending}>
                    {addSpent.isPending ? "Cadastrando..." : "Cadastrar gasto"}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        </div>
      </div>
    </>
  )
}

export default AddSpent
