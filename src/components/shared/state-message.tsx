export function ErrorState({ title = "Something went wrong", description }: { title?: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return <div className="rounded-2xl border p-6 text-sm text-muted-foreground">{label}...</div>;
}
