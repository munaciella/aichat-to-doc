import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <div className="flex flex-col flex-1 h-screen">
        <Header />

        <main className="flex-1 overflow-y-auto mb-10">
        {children}
        </main>
        </div>
    </ClerkLoaded>
  );
};

export default DashboardLayout;