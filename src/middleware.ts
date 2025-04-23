// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//     if (isProtectedRoute(req) ) await auth.protect()
//   });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// List of suspicious/bot paths to block
const blockedPaths = [
  "/.env",
  "/.git",
  "/wp-admin",
  "/wp-login.php",
  "/wordpress",
  "/phpmyadmin",
  "/config",
  "/setup-config.php",
  "/xmlrpc.php",
];

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.pathname;

  if (blockedPaths.some((path) => url.startsWith(path))) {
    return new NextResponse("Blocked", { status: 403 });
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
