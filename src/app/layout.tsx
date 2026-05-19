import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

export const metadata: Metadata = {
  title: "Hermes / Core AI Models",
  description:
    "At Hermes, we build AI to serve humanity’s long-term well-being.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-x-hidden antialiased">
      <body className="flex min-h-full flex-col overflow-x-hidden bg-white text-black">
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
