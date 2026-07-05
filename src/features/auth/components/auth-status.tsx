"use client";

import { useAuthContext } from "./auth-provider";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  if (isLoading) return null;

  return (
    <div data-authenticated={isAuthenticated ? "true" : "false"}>
      {user?.email ?? "Guest"}
    </div>
  );
}

