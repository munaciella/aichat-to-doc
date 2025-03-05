// import type { Metadata } from "next";
// import { Inter, IBM_Plex_Mono, Recursive } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ThemeProvider } from "@/components/ThemeProvider";

// const inter = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const ibmPlexMono = IBM_Plex_Mono({
//   variable: "--font-mono",
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: "swap",
// });

// const recursive = Recursive({
//   variable: "--font-recursive",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "AI Chat PDF",
//   description: "AI Chat PDF",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en" suppressHydrationWarning>
//         <body
//           className={`${inter.variable} ${ibmPlexMono.variable} ${recursive.variable} antialiased min-h-screen h-screen overflow-hidden flex flex-col`}
//         >
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <main className="">{children}</main>
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Recursive } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

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
            {/* Main content takes up remaining space */}
            <main className="flex-grow">{children}</main>
            {/* Footer - always sticks to the bottom */}
            <footer className="bg-gray-900 text-white py-4 text-center">
              © {new Date().getFullYear()} AI Chat PDF. All rights reserved.
            </footer>{" "}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
