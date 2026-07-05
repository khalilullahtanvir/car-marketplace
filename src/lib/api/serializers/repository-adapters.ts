import type { RepositoryResult } from "@/lib/repositories";
import type { RepositoryApiAdapter } from "../contracts/api-contracts";
import { createErrorResponse } from "../responses/response-builders";

export function createRepositoryAdapter<TEntity, TDto = TEntity>(
  adapter: RepositoryApiAdapter<TEntity, TDto>
) {
  return {
    toDto: adapter.toDto,
    toRepositoryResult(result: RepositoryResult<TEntity>): RepositoryResult<TDto> {
      if (result.error) {
        return {
          data: null,
          error: result.error
        };
      }

      return {
        data: adapter.toDto(result.data),
        error: null
      };
    },
    toErrorPayload(error: unknown) {
      return createErrorResponse(error);
    }
  };
}

