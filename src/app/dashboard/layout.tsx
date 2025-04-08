import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex-grow pb-52">
        {children}
        </main>
        <CookieBanner />
        <Footer />
        </div>
    </ClerkLoaded>
  );
};

export default DashboardLayout;