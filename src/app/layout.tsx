import type { Metadata } from "next";
import { Inter, Luckiest_Guy } from "next/font/google";
import { SmoothScroll } from "@/components/sites/thedictator/shared/SmoothScroll";
import "./globals.css";

/**
 * Target uses `Inter, "Inter Placeholder", sans-serif`. The placeholder family is
 * Framer's own font-loading shim and is dropped here in favour of next/font.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** Display face for the ticker logo. Ships a single weight (400). */
const luckiestGuy = Luckiest_Guy({
  variable: "--font-display",
  weight: "400",
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
    <html
      lang="en"
      className={`${inter.variable} ${luckiestGuy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
