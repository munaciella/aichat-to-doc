import { render } from "@testing-library/react";
import DashboardClient from "@/components/DashboardClient";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("DashboardClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows toast and clears localStorage if showSignInToast is set", () => {
    localStorage.setItem("showSignInToast", "true");
  
    render(<DashboardClient />);
  
    // Fast-forward timers
    jest.runAllTimers();
  
    expect(toast.success).toHaveBeenCalledWith("Signed in successfully!", {
      style: { backgroundColor: "#16A34A", color: "white" },
    });
  
    expect(localStorage.getItem("showSignInToast")).toBeNull();
  });
  

  it("does not show toast if showSignInToast is not set", () => {
    render(<DashboardClient />);
    jest.runAllTimers();

    expect(toast.success).not.toHaveBeenCalled();
  });
});
