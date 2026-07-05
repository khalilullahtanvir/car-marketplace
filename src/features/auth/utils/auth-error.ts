import type { AuthErrorShape } from "../types";

const UNKNOWN_AUTH_ERROR: AuthErrorShape = {
  code: "unknown",
  message: "An unexpected authentication error occurred."
};

export function normalizeAuthError(error: unknown): AuthErrorShape {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: string }).message ?? "").trim();
    const code = String((error as { code?: string }).code ?? "").trim();

    if (code.includes("email") && code.includes("confirm")) {
      return { code: "email_not_confirmed", message: message || "Please verify your email address." };
    }

    if (code.includes("invalid") || message.toLowerCase().includes("invalid login")) {
      return { code: "invalid_credentials", message: message || "Invalid email or password." };
    }

    if (code.includes("otp") || message.toLowerCase().includes("reset")) {
      return { code: "password_reset_error", message };
    }

    if (code.includes("oauth")) {
      return { code: "oauth_error", message };
    }

    return { code: "unknown", message: message || UNKNOWN_AUTH_ERROR.message };
  }

  return UNKNOWN_AUTH_ERROR;
}

export function isAuthErrorCode(value: string): value is AuthErrorShape["code"] {
  return [
    "invalid_credentials",
    "email_not_confirmed",
    "oauth_error",
    "session_expired",
    "password_reset_error",
    "signup_error",
    "verification_error",
    "unknown"
  ].includes(value);
}

