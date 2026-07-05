import type { SupabaseClient } from "@supabase/supabase-js";

export interface RepositoryContext {
  supabase: SupabaseClient;
  actorId?: string | null;
  actorRole?: string | null;
  requestId?: string | null;
}

export interface Transaction {
  readonly id: string;
  readonly startedAt: Date;
  readonly committedAt?: Date | null;
  readonly rolledBackAt?: Date | null;
}

export interface TransactionProvider {
  begin(): Promise<Transaction>;
  commit(transaction: Transaction): Promise<void>;
  rollback(transaction: Transaction): Promise<void>;
}

