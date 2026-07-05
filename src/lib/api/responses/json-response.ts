import type { APIResponse, ErrorResponse, PaginatedResponse } from "../contracts/api-contracts";
import { HTTP_STATUS, type HttpStatusCode } from "./http-status";

export function jsonResponse<T>(
  body: APIResponse<T> | ErrorResponse | PaginatedResponse<T>,
  status: HttpStatusCode = HTTP_STATUS.OK
) {
  return Response.json(body, { status });
}

