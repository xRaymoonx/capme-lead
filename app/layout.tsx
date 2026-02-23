import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CAPME Lead",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}