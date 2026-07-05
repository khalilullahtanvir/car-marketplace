import type { AppEnv, NodeEnv } from "@/types/env";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

const nodeEnv = (process.env.NODE_ENV ?? "development") as NodeEnv;

export const env: AppEnv = {
  NODE_ENV: nodeEnv,
  NEXT_PUBLIC_SITE_URL: getOptionalEnv("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  SUPABASE_SERVICE_ROLE_KEY: getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY")
};
