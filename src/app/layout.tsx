import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Next.js DnD Board",
  description: "A simple DnD board built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Providers>
          {children}
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
