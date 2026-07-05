"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./auth-provider";

export function AuthGuard({
  children,
  fallback = "/login"
}: {
  children: ReactNode;
  fallback?: string;
}) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(fallback);
    }
  }, [fallback, isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) return null;
  return <>{children}</>;
}

