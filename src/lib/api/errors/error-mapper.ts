import { APIError, ConflictError, ForbiddenError, NotFoundError, RateLimitError, UnauthorizedError, ValidationError } from "./api-errors";
import type { APIErrorShape } from "../contracts/api-contracts";
import { AppError } from "@/lib/errors";

export function mapErrorToApiError(error: unknown): APIErrorShape {
  if (error instanceof ValidationError) {
    return { code: error.code, message: error.message, details: error.details };
  }

  if (error instanceof UnauthorizedError || error instanceof ForbiddenError || error instanceof NotFoundError || error instanceof ConflictError || error instanceof RateLimitError || error instanceof APIError || error instanceof AppError) {
    return { code: error.code, message: error.message, details: "details" in error ? error.details : undefined };
  }

  if (error instanceof Error) {
    return { code: "UNKNOWN_ERROR", message: error.message };
  }

  return { code: "UNKNOWN_ERROR", message: "An unexpected API error occurred." };
}

