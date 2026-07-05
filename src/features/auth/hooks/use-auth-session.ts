"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import type { AuthSessionState, AuthSessionUser } from "../types";

export function useAuthSession() {
  const [state, setState] = useState<AuthSessionState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser: AuthSessionUser | null = data.session?.user
        ? {
            id: data.session.user.id,
            email: data.session.user.email ?? null,
            role: (data.session.user.app_metadata.role as string | null) ?? null
          }
        : null;

      setState({
        user: sessionUser,
        isAuthenticated: Boolean(data.session),
        isLoading: false
      });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser: AuthSessionUser | null = session?.user
        ? {
            id: session.user.id,
            email: session.user.email ?? null,
            role: (session.user.app_metadata.role as string | null) ?? null
          }
        : null;

      setState({
        user: sessionUser,
        isAuthenticated: Boolean(session),
        isLoading: false
      });
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return state;
}

