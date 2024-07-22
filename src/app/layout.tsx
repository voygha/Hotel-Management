import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Italiana, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '700', '900'], style: ['italic', 'normal'], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="font-normal">
          {/* Header */}
          <Header />
          {children}
          {/* Footer */}
          <Footer />
        </main>
      </body>
    </html>
  );
}
