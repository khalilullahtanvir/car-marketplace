export type OAuthProvider = "google" | "github";

export type AuthErrorCode =
  | "invalid_credentials"
  | "email_not_confirmed"
  | "oauth_error"
  | "session_expired"
  | "password_reset_error"
  | "signup_error"
  | "verification_error"
  | "unknown";

export interface AuthErrorShape {
  code: AuthErrorCode;
  message: string;
}

export interface AuthSessionUser {
  id: string;
  email: string | null;
  role: string | null;
}

export interface AuthSessionState {
  user: AuthSessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthRedirectOptions {
  redirectTo?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthSignupPayload extends AuthCredentials {
  confirmPassword: string;
}

export interface PasswordResetPayload {
  email: string;
}

export interface UpdatePasswordPayload {
  password: string;
  confirmPassword: string;
}
