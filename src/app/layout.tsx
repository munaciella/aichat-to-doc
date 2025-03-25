import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const recursive = Recursive({
  variable: "--font-recursive",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paperly",
  description: "Paperly is a chatbot that can answer questions about your documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="min-h-screen">
        <body
          className={`${inter.variable} ${ibmPlexMono.variable} ${recursive.variable} antialiased min-h-screen flex flex-col`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex-grow">{children}</main>
          </ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              className:
                "px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8 rounded-lg text-lg md:text-xl text-left",
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
