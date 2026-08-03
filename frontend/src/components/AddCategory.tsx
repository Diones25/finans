import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";
import { useAddCategory } from "@/utils/mutations";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { addCategorySchema } from "@/schemas/addCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NumericFormat } from 'react-number-format';
import { useState } from "react";
import { Tag } from "lucide-react";

function AddCategory() {
  const [formattedValue, setFormattedValue] = useState("");
  const navigate = useNavigate();
  const addCategory = useAddCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema)
  })

  const nameValue = watch("name");

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
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold tracking-tight">Adicionar categoria</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Defina um nome e um saldo inicial. Você pode ajustar depois.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Ex: Alimentação"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance">Saldo inicial</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    R$
                  </span>
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
                      setValue(
                        "balance",
                        parseFloat(values.value.replace(",", ".")),
                        { shouldValidate: true }
                      );
                    }}
                    {...register("balance", { valueAsNumber: true })}
                    className={`pl-10 ${errors.balance ? "border-destructive" : ""}`}
                    placeholder="0,00"
                  />
                </div>
                {errors.balance ? (
                  <p className="text-sm text-destructive">{errors.balance.message}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Dica: use o saldo atual da categoria (se já existir no seu controle).
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="hidden sm:block">
                  <p className="text-xs text-muted-foreground">Preview</p>
                  <div className="mt-1 inline-flex items-center rounded-full border border-border bg-background/40 px-2.5 py-1 text-xs">
                    {nameValue?.trim() || "Nova categoria"}
                  </div>
                </div>

                <div className="ml-auto flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Voltar
                  </Button>
                  <Button type="submit" disabled={addCategory.isPending}>
                    {addCategory.isPending ? "Cadastrando..." : "Cadastrar"}
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

export default AddCategory
