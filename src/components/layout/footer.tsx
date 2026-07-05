import { APP_NAME } from "@/constants";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <Container className="py-6 text-sm text-neutral-600">{APP_NAME}</Container>
    </footer>
  );
}
