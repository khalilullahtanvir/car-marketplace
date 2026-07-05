import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AppProvider } from "@/providers/app-provider";
import { metadata as baseMetadata } from "./metadata";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
