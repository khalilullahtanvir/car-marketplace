import { AppError, ConflictError as BaseConflictError, NotFoundError as BaseNotFoundError, RateLimitError as BaseRateLimitError, ValidationError as BaseValidationError } from "@/lib/errors";

export class APIError extends AppError {
  readonly details?: unknown;

  constructor(message: string, code = "API_ERROR", statusCode = 500, details?: unknown) {
    super(message, code, statusCode);
    this.name = "APIError";
    this.details = details;
  }
}

export class ValidationError extends BaseValidationError {
  readonly details?: unknown;

  constructor(message = "Validation failed", details?: unknown) {
    super(message);
    this.details = details;
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(message, "UNAUTHORIZED", 401, details);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends APIError {
  constructor(message = "Forbidden", details?: unknown) {
    super(message, "FORBIDDEN", 403, details);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends BaseNotFoundError {
  readonly details?: unknown;

  constructor(message = "Not found", details?: unknown) {
    super(message);
    this.details = details;
  }
}

export class ConflictError extends BaseConflictError {
  readonly details?: unknown;

  constructor(message = "Conflict", details?: unknown) {
    super(message);
    this.details = details;
  }
}

export class RateLimitError extends BaseRateLimitError {
  readonly details?: unknown;

  constructor(message = "Too many requests", details?: unknown) {
    super(message);
    this.details = details;
  }
}

