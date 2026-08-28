import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rivva — Caribbean's Service Network",
  description: "Connect with verified service providers across the Caribbean. Powered by Credii.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}