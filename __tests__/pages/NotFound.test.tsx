import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "@/app/not-found";
import { useRouter } from "next/navigation";

// Mock `next/navigation`
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NotFound Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the 404 text and image", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(/oops! the page you’re looking seems to have been lost in space!/i)
    ).toBeInTheDocument();

    // If your alt text is correct, this should work
    expect(
      screen.getByAltText(/astronaut lost in space/i)
    ).toBeInTheDocument();
  });

  it("navigates to the homepage on button click", () => {
    render(<NotFound />);
    const button = screen.getByRole("button", { name: /go to homepage/i });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
