import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
