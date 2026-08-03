import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { useEffect, useMemo, useState, type ComponentType } from "react"
import { formatCurrency, formateDate } from "@/lib/utils";
import Pagination from "./Pagination";
import { useAllSpents, useCategories } from "@/utils/queries";
import { useRemoveCategory, useRemoveSpent } from "@/utils/mutations";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Wallet,
  Tag,
  Plus,
  Trash2,
  Pencil,
  PlusCircle,
  Receipt,
  Inbox,
  AlertTriangle,
  X,
} from "lucide-react";

// Paleta de cores para diferenciar categorias visualmente na tabela de gastos.
// Determinística por nome, então a mesma categoria sempre recebe a mesma cor.
const CATEGORY_COLORS = [
  "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
];

function categoryColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length];
}

// -----------------------------------------------------------------------
// Modal de confirmação genérico e leve (sem dependência extra de shadcn).
// Usado antes de qualquer exclusão para evitar cliques acidentais.
// -----------------------------------------------------------------------
function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/15">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold leading-tight">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            onClick={onCancel}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}

// Estado vazio reutilizável — comunica claramente que não há dados e qual a próxima ação.
type EmptyStateIcon = ComponentType<{ className?: string }>;

function EmptyState({ icon: Icon, title, subtitle }: { icon: EmptyStateIcon; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="font-medium">{title}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

// Skeleton de linhas de tabela — substitui o texto "Carregando..." por algo que
// já antecipa o formato do conteúdo (reduz a sensação de "salto" quando os dados chegam).
function TableSkeletonRows({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r}>
          {Array.from({ length: columns }).map((_, c) => (
            <TableCell key={c}>
              <div className="h-4 w-full max-w-[140px] animate-pulse rounded bg-muted" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function Home() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [maxButtons] = useState(10);

  const [spentToDelete, setSpentToDelete] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const { data, isLoading, isError } = useAllSpents(page, pageSize);
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories
  } = useCategories();

  const removeSpent = useRemoveSpent();
  const removeCategory = useRemoveCategory();

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const totalSaldo = useMemo(() => {
    if (!Array.isArray(categoriesData)) return 0;
    return categoriesData.reduce((acc, cat) => acc + Number(cat.balance), 0);
  }, [categoriesData]);

  const confirmDeleteSpent = () => {
    if (spentToDelete) removeSpent.mutate(spentToDelete);
    setSpentToDelete(null);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) removeCategory.mutate(categoryToDelete);
    setCategoryToDelete(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6 md:px-6">
        {/* ------------------------------------------------------------ */}
        {/* Resumo rápido: dá contexto imediato antes da lista detalhada */}
        {/* ------------------------------------------------------------ */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo total</p>
              <p className="text-xl font-semibold tabular-nums">
                {isLoadingCategories ? "—" : formatCurrency(totalSaldo)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-chart-2/15">
              <Tag className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categorias ativas</p>
              <p className="text-xl font-semibold tabular-nums">
                {isLoadingCategories ? "—" : categoriesData?.length ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Lista de gastos */}
        {/* ------------------------------------------------------------ */}
        <section className="pb-10">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-2xl font-semibold">Lista de gastos</h1>
            </div>
            <Link to={"/add/spent"}>
              <Button className="gap-1.5">
                <Plus className="h-4 w-4" />
                Adicionar gasto
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-40">Valor</TableHead>
                  <TableHead className="w-64">Categoria</TableHead>
                  <TableHead className="w-64">Data</TableHead>
                  <TableHead className="w-24 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading || isLoadingCategories ? (
                  <TableSkeletonRows columns={5} />
                ) : isError || isErrorCategories ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-red-400">
                      Erro ao carregar dados. Verifique a conexão com o servidor.
                    </TableCell>
                  </TableRow>
                ) : Array.isArray(data?.spents) && data.spents.length > 0 ? (
                  data.spents.map((spt) => (
                    <TableRow key={spt.id}>
                      <TableCell className="font-medium">{spt.description}</TableCell>
                      <TableCell className="tabular-nums">{formatCurrency(Number(spt.value))}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${categoryColor(spt.category.name)}`}
                        >
                          {spt.category.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formateDate(spt.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setSpentToDelete(spt.id)}
                            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                            aria-label={`Excluir gasto ${spt.description}`}
                            title="Excluir gasto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyState
                        icon={Inbox}
                        title="Nenhum gasto por aqui ainda"
                        subtitle="Assim que você adicionar um gasto, ele aparece nesta lista."
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="pt-4">
              <Pagination
                page={page}
                maxButtons={maxButtons}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------ */}
        {/* Categorias */}
        {/* ------------------------------------------------------------ */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-2xl font-semibold">Categorias</h1>
            </div>
            <Link to={"/add/category"}>
              <Button variant="outline" className="gap-1.5">
                <PlusCircle className="h-4 w-4" />
                Adicionar categoria
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Categoria</TableHead>
                  <TableHead className="w-40">Saldo</TableHead>
                  <TableHead className="w-40 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingCategories ? (
                  <TableSkeletonRows columns={3} rows={3} />
                ) : Array.isArray(categoriesData) && categoriesData.length > 0 ? (
                  categoriesData.map((cat) => {
                    const balance = Number(cat.balance);
                    return (
                      <TableRow key={cat.id}>
                        <TableCell className="font-medium">{cat.name}</TableCell>
                        <TableCell
                          className={`tabular-nums font-medium ${balance < 0 ? "text-red-400" : "text-emerald-400"
                            }`}
                        >
                          {formatCurrency(balance)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Link to={`/add/balance/${cat.id}`}>
                              <button
                                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                                aria-label={`Adicionar saldo em ${cat.name}`}
                                title="Adicionar saldo"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </Link>
                            <Link to={`/edit/category/${cat.id}`}>
                              <button
                                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                aria-label={`Editar ${cat.name}`}
                                title="Editar categoria"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              onClick={() => setCategoryToDelete(cat.id)}
                              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                              aria-label={`Excluir ${cat.name}`}
                              title="Excluir categoria"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <EmptyState
                        icon={Tag}
                        title="Nenhuma categoria cadastrada"
                        subtitle="Crie categorias para organizar seus gastos e acompanhar o saldo de cada uma."
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      </div>

      <ConfirmDialog
        open={!!spentToDelete}
        title="Excluir este gasto?"
        description="Essa ação não pode ser desfeita. O gasto será removido permanentemente da lista."
        onConfirm={confirmDeleteSpent}
        onCancel={() => setSpentToDelete(null)}
      />

      <ConfirmDialog
        open={!!categoryToDelete}
        title="Excluir esta categoria?"
        description="Isso pode afetar os gastos vinculados a ela. Essa ação não pode ser desfeita."
        onConfirm={confirmDeleteCategory}
        onCancel={() => setCategoryToDelete(null)}
      />
    </>
  )
}

export default Home
