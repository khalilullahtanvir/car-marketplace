"use client";

import { useMemo } from "react";
import { useAuthSession } from "./use-auth-session";
import { isAdminRole, isDealerRole, isModeratorRole } from "../utils/roles";

export function useAuthRoles() {
  const session = useAuthSession();

  return useMemo(
    () => ({
      ...session,
      isAdmin: isAdminRole(session.user?.role),
      isModerator: isModeratorRole(session.user?.role),
      isDealerMember: isDealerRole(session.user?.role)
    }),
    [session]
  );
}

