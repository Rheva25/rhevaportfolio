import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Admin System | Rheva Developer Platform",
  description: "Rheva Developer Platform Administration",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background">
        {children}
      </body>
    </html>
  );
}
