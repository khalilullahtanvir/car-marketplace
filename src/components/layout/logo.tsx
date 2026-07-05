import Link from "next/link";
import { APP_NAME, ROUTES } from "@/constants";

export function Logo() {
  return (
    <Link href={ROUTES.home} className="text-sm font-semibold tracking-tight">
      {APP_NAME}
    </Link>
  );
}
