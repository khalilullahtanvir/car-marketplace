export type NodeEnv = "development" | "test" | "production";

export interface AppEnv {
  readonly NODE_ENV: NodeEnv;
  readonly NEXT_PUBLIC_SITE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string | undefined;
}
