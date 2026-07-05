export interface AppEnv {
  readonly NODE_ENV: "development" | "test" | "production";
  readonly NEXT_PUBLIC_SITE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string | undefined;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function readOptionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

export const env: AppEnv = {
  NODE_ENV: (process.env.NODE_ENV ?? "development") as AppEnv["NODE_ENV"],
  NEXT_PUBLIC_SITE_URL: readOptionalEnv("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: readRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: readRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: readOptionalEnv("SUPABASE_SERVICE_ROLE_KEY")
};
