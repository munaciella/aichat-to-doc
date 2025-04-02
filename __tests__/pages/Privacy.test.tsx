import { render, screen } from "@testing-library/react";
import PrivacyPage from "@/app/privacy/page";

describe("PrivacyPage", () => {
  it("renders the title and effective date", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByText(/effective date: 26\/03\/2025/i)).toBeInTheDocument();
  });

  it("renders all section titles", () => {
    const { getByText } = render(<PrivacyPage />);

    expect(getByText(/1\. Information We Collect/i)).toBeInTheDocument();
    expect(getByText(/2\. How We Use Information/i)).toBeInTheDocument();
    expect(getByText(/3\. Data Sharing/i)).toBeInTheDocument();
    expect(getByText(/4\. Cookies/i)).toBeInTheDocument();
    expect(getByText(/5\. Your Rights/i)).toBeInTheDocument();
    expect(getByText(/6\. Contact/i)).toBeInTheDocument();
  });

  it("contains the contact email link", () => {
    render(<PrivacyPage />);
    const link = screen.getByRole("link", { name: /here/i });
    expect(link).toHaveAttribute("href", "mailto:francesco.vurchio82@gmail.com");
  });
});
