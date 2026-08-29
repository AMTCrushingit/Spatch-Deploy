import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Rivva — Trusted talent. Real opportunity.",
  description: "Trusted talent. Real opportunity. Rivva connects verified Caribbean professionals with clients across 6 islands. Powered by Credii.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}