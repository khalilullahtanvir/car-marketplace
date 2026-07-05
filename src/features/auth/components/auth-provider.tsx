"use client";

import type { ReactNode } from "react";
import { useAuthSession } from "../hooks/use-auth-session";
import { createContext, useContext, useMemo } from "react";
import type { AuthSessionState } from "../types";

const AuthContext = createContext<AuthSessionState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const state = useAuthSession();
  const value = useMemo(() => state, [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider.");
  }
  return context;
}

