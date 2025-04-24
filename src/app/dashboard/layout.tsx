'use client";'

import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";
import { SubscriptionProvider } from "../context/SubscriptionContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <SubscriptionProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex-grow pb-52">
        {children}
        </main>
        <CookieBanner />
        <Footer />
        </div>
      </SubscriptionProvider>
    </ClerkLoaded>
  );
};

export default DashboardLayout;