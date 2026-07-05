import Link from "next/link";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href={ROUTES.home} className="text-sm underline">
        Return home
      </Link>
    </div>
  );
}
