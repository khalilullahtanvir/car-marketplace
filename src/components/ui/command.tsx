import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";

export function CommandPalette({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border bg-popover shadow-lg", className)}>{children}</div>;
}
export function CommandInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="h-10 w-full border-b bg-transparent px-3 text-sm outline-none" {...props} />;
}
export function CommandList({ children }: { children: ReactNode }) {
  return <div className="max-h-80 overflow-auto p-1">{children}</div>;
}
export function CommandItem({ children }: { children: ReactNode }) {
  return <button type="button" className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm hover:bg-accent">{children}</button>;
}
