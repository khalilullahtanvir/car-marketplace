"use client";

import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldValues, type FieldPath } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export { FormProvider };

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControllerProps<TFieldValues, TName>
) {
  return <Controller {...props} />;
}

export function FormItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function FormLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <label className={cn("text-sm font-medium", className)}>{children}</label>;
}

export function FormDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function FormMessage({ className }: { className?: string }) {
  const {
    formState: { errors }
  } = useFormContext();
  const message = Object.values(errors).find(Boolean)?.message;
  if (!message) return null;
  return <p className={cn("text-sm text-destructive", className)}>{String(message)}</p>;
}

export function FormControl({
  children
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
