import type { ReactNode } from "react";

export interface BaseComponentProps {
  readonly className?: string;
}

export interface WithChildrenProps {
  readonly children: ReactNode;
}
