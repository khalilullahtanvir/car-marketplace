import type { RequestContext } from "../contracts/api-contracts";

export interface ApiServerConfig {
  trustProxy?: boolean;
}

export function createApiServer(config: ApiServerConfig = {}) {
  return {
    trustProxy: config.trustProxy ?? false
  };
}

export function getServerRequestContext(request: Request): RequestContext {
  const url = new URL(request.url);
  return {
    requestId: crypto.randomUUID(),
    pathname: url.pathname,
    method: request.method,
    url: request.url,
    headers: request.headers,
    query: url.searchParams,
    params: {},
    userId: null,
    role: null
  };
}

