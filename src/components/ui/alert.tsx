import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Alert({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-border bg-card p-4 text-card-foreground", className)} {...props} />;
}

export function AlertTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
