import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Calendar({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="date" className={cn("h-10 rounded-xl border border-input bg-background px-3 text-sm", className)} {...props} />;
}
