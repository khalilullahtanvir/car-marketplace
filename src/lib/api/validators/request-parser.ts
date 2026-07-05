import type { RequestContext } from "../contracts/api-contracts";

export async function parseJsonRequest<T>(request: Request): Promise<T | null> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return null;
  }

  return (await request.json()) as T;
}

export function buildRequestContext(request: Request, extras: Partial<RequestContext> = {}): RequestContext {
  const url = new URL(request.url);

  return {
    requestId: extras.requestId ?? crypto.randomUUID(),
    pathname: extras.pathname ?? url.pathname,
    method: extras.method ?? request.method,
    url: extras.url ?? request.url,
    headers: extras.headers ?? request.headers,
    query: extras.query ?? url.searchParams,
    params: extras.params ?? {},
    userId: extras.userId ?? null,
    role: extras.role ?? null
  };
}

