import { createErrorResponse } from "../responses/response-builders";
import { HTTP_STATUS } from "../responses/http-status";
import { jsonResponse } from "../responses/json-response";

export type RequestMiddleware = (request: Request) => Promise<Request | Response> | Request | Response;

export async function withRequestMiddleware(request: Request, middleware: RequestMiddleware[]) {
  try {
    let current: Request | Response = request;
    for (const step of middleware) {
      current = await step(current instanceof Request ? current : request);
      if (current instanceof Response) {
        return current;
      }
    }
    return current;
  } catch (error) {
    return jsonResponse(createErrorResponse(error), HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

