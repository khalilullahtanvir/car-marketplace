export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPrice(value: number, currency = "USD", locale = "en-US"): string {
  return formatCurrency(value, currency, locale);
}

export function formatDate(value: Date | string, locale = "en-US"): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function formatRelativeDate(value: Date | string, locale = "en-US"): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const diff = Date.now() - date.getTime();
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-days, "day");
}

export function generateSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(value: string, length = 120): string {
  return value.length <= length ? value : `${value.slice(0, length).trimEnd()}…`;
}
