import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";
import NavigateBar from "@/app/NavigateBar";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ur todo",
  description: "todolist for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <NavigateBar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
