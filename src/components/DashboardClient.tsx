"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardClient() {
  useEffect(() => {
    const showSignInToast = localStorage.getItem("showSignInToast");

    if (showSignInToast) {
      setTimeout(() => {
        toast.success("Signed in successfully!", {
          style: { backgroundColor: "#16A34A", color: "white" },
        });
      }, 600);

      localStorage.removeItem("showSignInToast");
    }
  }, []);

  return null;
}
