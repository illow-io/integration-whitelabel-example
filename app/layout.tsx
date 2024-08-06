import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';

import "./css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privacy Shire",
  description: "A holistic solution to comply with privacy regulations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
        </body>
      </UserProvider>
      <GoogleTagManager gtmId="GTM-W7L7N7J" />
    </html>
  );
}
