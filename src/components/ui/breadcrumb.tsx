import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Breadcrumb({ children, className }: { children: ReactNode; className?: string }) {
  return <nav aria-label="Breadcrumb" className={cn("flex", className)}>{children}</nav>;
}
export function BreadcrumbList({ children, className }: { children: ReactNode; className?: string }) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground", className)}>{children}</ol>;
}
export function BreadcrumbItem({ children }: { children: ReactNode }) {
  return <li className="inline-flex items-center gap-1.5">{children}</li>;
}
export function BreadcrumbLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="transition-colors hover:text-foreground">{children}</Link>;
}
export function BreadcrumbPage({ children }: { children: ReactNode }) {
  return <span className="font-normal text-foreground">{children}</span>;
}
export function BreadcrumbSeparator() {
  return <ChevronRight className="h-4 w-4" />;
}
