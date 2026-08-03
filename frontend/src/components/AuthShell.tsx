import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl items-start justify-between">
        <div className="text-sm">
          <div className="font-semibold tracking-tight">Finans</div>
          <div className="text-muted-foreground">Controle seus gastos com clareza.</div>
        </div>
        <ThemeToggle />
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-sm font-medium">Rápido</div>
                <div className="text-sm text-muted-foreground">
                  Cadastre gastos e categorias em poucos cliques.
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-sm font-medium">Organizado</div>
                <div className="text-sm text-muted-foreground">
                  Visualize saldo por categoria e acompanhe o total.
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <div className="text-sm font-medium">Seguro</div>
                <div className="text-sm text-muted-foreground">
                  Sessão com token JWT persistido no navegador.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
