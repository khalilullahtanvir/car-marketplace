export interface ApiClientConfig {
  baseUrl: string;
  headers?: HeadersInit;
}

export function createApiClient(config: ApiClientConfig) {
  return {
    baseUrl: config.baseUrl,
    headers: config.headers ?? {}
  };
}

