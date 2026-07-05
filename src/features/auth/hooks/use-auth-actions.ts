"use client";

import { loginAction, logoutAction, oauthAction, passwordResetRequestAction, resendVerificationAction, signupAction, updatePasswordAction } from "../actions/auth-actions";

export function useAuthActions() {
  return {
    loginAction,
    logoutAction,
    oauthAction,
    passwordResetRequestAction,
    resendVerificationAction,
    signupAction,
    updatePasswordAction
  };
}

