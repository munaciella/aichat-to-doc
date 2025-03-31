import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import Home from "@/app/page";

// Mock Clerk
jest.mock("@clerk/nextjs", () => ({
  useAuth: jest.fn(),
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders heading and intro text", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });

    render(<Home />);

    expect(
      screen.getByText("Your Interactive Document Companion")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Transform Your Docs into Interactive Conversations")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  it("shows toast for signed-in user on Get Started click", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });

    render(<Home />);
    const button = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(button);

    expect(toast.info).toHaveBeenCalledWith("Redirecting to dashboard...", {
      style: { backgroundColor: "#2563EB", color: "white" },
    });
  });

  it("shows toast for guest user on Get Started click", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });

    render(<Home />);
    const button = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(button);

    expect(toast.warning).toHaveBeenCalledWith("You need to be signed in to get started.", {
      description: "Redirecting to sign in page...",
      style: { backgroundColor: "#EAB308", color: "white" },
    });

    expect(localStorage.getItem("showSignInToast")).toBe("true");
  });

  it("renders all feature titles", () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });

    render(<Home />);

    expect(screen.getByText("Store your Documents")).toBeInTheDocument();
    expect(screen.getByText("Blazing Fast Responses")).toBeInTheDocument();
    expect(screen.getByText("Chat Memorisation")).toBeInTheDocument();
    expect(screen.getByText("Interactive PDF Viewer")).toBeInTheDocument();
    expect(screen.getByText("Cloud Backup")).toBeInTheDocument();
    expect(screen.getByText("Responsive Across Devices")).toBeInTheDocument();
  });
});
