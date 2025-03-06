// const DashboardPage = () => {
//   return <div>Hello</div>;
// };

// export default DashboardPage;

"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const DashboardPage = () => {
  useEffect(() => {
    // ✅ Check if the sign-in toast flag exists
    const showSignInToast = localStorage.getItem("showSignInToast");

    if (showSignInToast) {
      // ✅ Show success toast with delay
      setTimeout(() => {
        toast.success("Signed in successfully!");
      }, 800); // Delay to ensure it's visible

      // ✅ Remove the flag so it doesn't show again on refresh
      localStorage.removeItem("showSignInToast");
    }
  }, []);

  return (
    <main>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </main>
  );
}

export default DashboardPage