import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Carousel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
}
export function CarouselContent({ children }: { children: ReactNode }) {
  return <div className="flex gap-4">{children}</div>;
}
export function CarouselItem({ children }: { children: ReactNode }) {
  return <div className="min-w-0 shrink-0 grow-0 basis-full">{children}</div>;
}
