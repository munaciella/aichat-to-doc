import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Specify available weights
  display: "swap",
});

const recursive = Recursive({
  variable: "--font-recursive",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Specify available weights
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Chat PDF",
  description: "AI Chat PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${ibmPlexMono.variable} ${recursive.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
