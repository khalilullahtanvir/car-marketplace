import type { ApiHandler } from "../contracts/api-contracts";
import { buildRequestContext, parseJsonRequest } from "../validators";
import { asyncHandler } from "./async-handler";

export interface GenericEndpointHandlerOptions<TBody = unknown> {
  transformBody?: (body: TBody | null) => TBody | null;
}

export function createGenericEndpointHandler<TBody, TOutput>(handler: ApiHandler<TBody, TOutput>, options: GenericEndpointHandlerOptions<TBody> = {}) {
  return async (request: Request, contextExtras: Partial<ReturnType<typeof buildRequestContext>> = {}) => {
    const body = await parseJsonRequest<TBody>(request);
    const requestContext = buildRequestContext(request, contextExtras);
    const normalizedBody = options.transformBody ? options.transformBody(body) : body;

    return asyncHandler<TBody, TOutput>(handler)(request, requestContext, normalizedBody as TBody);
  };
}
