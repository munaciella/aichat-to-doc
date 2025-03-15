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
            {/* © Paperly{" "}{new Date().getFullYear()}. */}
          </ThemeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "px-4 py-3 sm:px-6 sm:py-4 rounded-lg text-lg md:text-base text-left",
            }}
          />

          {/* Footer */}
        </body>
      </html>
    </ClerkProvider>
  );
}
