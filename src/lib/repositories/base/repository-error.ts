export type RepositoryErrorCode =
  | "UNKNOWN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "TIMEOUT"
  | "NETWORK"
  | "INVALID_ARGUMENT";

export class RepositoryError extends Error {
  readonly code: RepositoryErrorCode;
  readonly cause?: unknown;

  constructor(message: string, code: RepositoryErrorCode = "UNKNOWN", cause?: unknown) {
    super(message);
    this.name = "RepositoryError";
    this.code = code;
    this.cause = cause;
  }
}

