import type { ApiHandler } from "../contracts/api-contracts";
import { createErrorResponse } from "../responses/response-builders";
import { HTTP_STATUS } from "../responses/http-status";
import { jsonResponse } from "../responses/json-response";

export function asyncHandler<TInput, TOutput>(handler: ApiHandler<TInput, TOutput>) {
  return async (request: Request, context: Parameters<ApiHandler<TInput, TOutput>>[0]["context"]) => {
    try {
      const result = await handler({ context, body: undefined });
      return jsonResponse(result.body, result.status as number);
    } catch (error) {
      return jsonResponse(createErrorResponse(error), HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  };
}
