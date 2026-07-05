import type { ReactNode } from "react";

export function DashboardShell({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="grid min-h-screen gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="border-r p-4">{sidebar}</aside>
      <section className="p-4">{children}</section>
    </div>
  );
}
