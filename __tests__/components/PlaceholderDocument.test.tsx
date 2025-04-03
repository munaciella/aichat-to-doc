import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlaceholderDocument from "@/components/PlaceholderDocument";
import { useRouter } from "next/navigation";
import useSubscription from "../../hooks/useSubscription";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../hooks/useSubscription");

describe("PlaceholderDocument", () => {
  const mockUseSubscription = useSubscription as jest.MockedFunction<typeof useSubscription>;
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders upload UI and navigates to upload when not over file limit", async () => {
    mockUseSubscription.mockReturnValue({
      isOverFileLimit: false,
    } as ReturnType<typeof useSubscription>);

    render(<PlaceholderDocument />);
    
    expect(screen.getByText("Upload a document")).toBeInTheDocument();
    expect(screen.getByRole("button")).toContainElement(screen.getByText(/upload/i));

    await userEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/dashboard/upload");
  });

  it("renders upgrade UI and navigates to upgrade when over file limit", async () => {
    mockUseSubscription.mockReturnValue({
      isOverFileLimit: true,
    } as ReturnType<typeof useSubscription>);

    render(<PlaceholderDocument />);
    
    expect(screen.getByText("Upgrade to upload more documents")).toBeInTheDocument();
    expect(screen.getByRole("button")).toContainElement(screen.getByText(/upgrade/i));

    await userEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/dashboard/upgrade");
  });
});
