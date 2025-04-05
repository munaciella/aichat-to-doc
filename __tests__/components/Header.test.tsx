/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import "@testing-library/jest-dom";

jest.mock("@clerk/nextjs", () => ({
    SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    UserButton: () => <div data-testid="user-button">UserButton</div>,
  }));
  
  jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
      <img src={src} alt={alt} />
    ),
  }));
  
  jest.mock("../../../public/paperly.png", () => "logo.png");
  
  jest.mock("@/components/UpgradeButton", () => () => <div data-testid="upgrade-button">Upgrade</div>);
  
  jest.mock("@/components/ThemeToggle", () => ({
    ThemeToggle: () => <div data-testid="theme-toggle">ThemeToggle</div>,
  }));
  

describe("Header", () => {
  it("renders Paperly logo and title", () => {
    render(<Header />);
    expect(screen.getByAltText("Paperly Logo")).toBeInTheDocument();
    expect(screen.getByText("Paperly")).toBeInTheDocument();
  });

  it("renders desktop nav items", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /my documents/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /upload/i })).toBeInTheDocument();
  });

  it("renders Upgrade and Theme toggle", () => {
    render(<Header />);
    expect(screen.getByTestId("upgrade-button")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders user button", () => {
    render(<Header />);
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
  });
});
