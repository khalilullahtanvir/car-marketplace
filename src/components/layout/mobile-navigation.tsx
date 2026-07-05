import type { ReactNode } from "react";

export function MobileNavigation({ children }: { children: ReactNode }) {
  return <div className="lg:hidden">{children}</div>;
}
