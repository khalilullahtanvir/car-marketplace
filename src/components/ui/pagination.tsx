import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Pagination({ children, className }: { children: ReactNode; className?: string }) {
  return <nav aria-label="Pagination" className={cn("flex items-center justify-center", className)}>{children}</nav>;
}
export function PaginationContent({ children }: { children: ReactNode }) {
  return <ul className="flex items-center gap-1">{children}</ul>;
}
export function PaginationItem({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}
export function PaginationLink({ href, children, isActive }: { href: string; children: ReactNode; isActive?: boolean }) {
  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={cn("inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm transition-colors hover:bg-accent", isActive && "bg-accent")}>
      {children}
    </Link>
  );
}
