import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/component/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // bg-grid bg-[length:10px_10px] min-h-screen
    <html lang="en" className="animate-fadeIn">
      <body className={`${inter.className}`}>
        {/* <div className="bg-dark-grid bg-[length:100px_100px] min-h-screen"> */}
          {children}
        {/* </div> */}
      </body>
    </html>
  );
}
