import { z } from "zod";

export const stringSchema = z.string().trim().min(1);
export const emailSchema = z.string().trim().email();
export const phoneSchema = z.string().trim().regex(/^\+?[1-9]\d{7,14}$/);
export const uuidSchema = z.string().uuid();
export const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const moneySchema = z.number().finite().nonnegative();
export const yearSchema = z.number().int().min(1900).max(new Date().getFullYear() + 1);
export const urlSchema = z.string().trim().url();
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20)
});
export const searchSchema = z.object({
  query: z.string().trim().default(""),
  sort: z.string().trim().default("relevance")
});
