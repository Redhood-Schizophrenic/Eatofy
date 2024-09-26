import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eatofy",
  description: "Created by Appniche Technologies",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-dvh`}>{children}</body>
    </html>
  );
}
