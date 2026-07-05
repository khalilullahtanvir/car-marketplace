import type { ReactNode } from "react";

export function ResizablePanelGroup({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 w-full">{children}</div>;
}
export function ResizablePanel({ children }: { children: ReactNode }) {
  return <div className="min-w-0 flex-1">{children}</div>;
}
