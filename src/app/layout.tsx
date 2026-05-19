import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

export const metadata: Metadata = {
  title: "Hermes",
  description: "Hermes landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
