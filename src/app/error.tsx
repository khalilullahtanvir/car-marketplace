"use client";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-neutral-600">{error.message}</p>
      <button type="button" onClick={reset} className="rounded-md border px-4 py-2 text-sm">
        Try again
      </button>
    </div>
  );
}
