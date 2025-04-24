/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// Mock logo
jest.mock("../../../public/paperly.png", () => "logo.png");

describe("Footer", () => {
  it("renders logo and Paperly title", () => {
    render(<Footer />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Paperly")).toBeInTheDocument();
  });

  it("renders quick links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /my documents/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /upload/i })).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /terms policy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact us/i })).toBeInTheDocument();
  });

  it("renders social icons", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", expect.stringContaining("github.com"));
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", expect.stringContaining("linkedin.com"));
  });

  it("displays current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© Paperly ${year}.`)).toBeInTheDocument();
  });

  it("shows the developer link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /francesco.dev/i })).toBeInTheDocument();
  });
});
