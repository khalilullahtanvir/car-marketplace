import { PageShell } from "@/components/shared/page-shell";

export default function HomePage() {
  return (
    <PageShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Car Marketplace</h1>
        <p className="max-w-2xl text-sm text-neutral-600">
          Production foundation is ready. Feature implementation will follow the finalized architecture.
        </p>
      </div>
    </PageShell>
  );
}
