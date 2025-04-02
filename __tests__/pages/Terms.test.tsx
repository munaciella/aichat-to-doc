import { render, screen } from "@testing-library/react";
import TermsPage from "@/app/terms/page";

describe("TermsPage", () => {
  it("renders the title and effective date", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { name: /terms of service/i })).toBeInTheDocument();
    expect(screen.getByText(/effective date: 26\/03\/2025/i)).toBeInTheDocument();
  });

  it("renders all the sections", () => {
    const { getByText } = render(<TermsPage />);

    expect(getByText(/1\. Use of Our Service/i)).toBeInTheDocument();
    expect(getByText(/2\. Your Content/i)).toBeInTheDocument();
    expect(getByText(/3\. Termination/i)).toBeInTheDocument();
    expect(getByText(/4\. Changes to Terms/i)).toBeInTheDocument();
    expect(getByText(/5\. Contact/i)).toBeInTheDocument();
  });

  it("contains contact link", () => {
    render(<TermsPage />);
    const link = screen.getByRole("link", { name: /here/i });
    expect(link).toHaveAttribute("href", "mailto:francesco.vurchio82@gmail.com");
  });
});
