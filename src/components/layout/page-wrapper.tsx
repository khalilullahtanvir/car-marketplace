import type { ReactNode } from "react";
import { Container } from "./container";

export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1">
      <Container className="py-8">{children}</Container>
    </main>
  );
}
