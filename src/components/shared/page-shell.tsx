import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-1 px-4 py-12">{children}</main>;
}
