import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/sites/lilfrogeth-com-629a1bd8/shared/SmoothScroll";
import "./globals.css";

/**
 * Target uses `Inter, "Inter Placeholder", sans-serif`. The placeholder family is
 * Framer's own font-loading shim and is dropped here in favour of next/font.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Placeholder Title",
  description: "Placeholder description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
