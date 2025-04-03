import { render, screen, fireEvent, act } from "@testing-library/react";
import UpgradeButton from "@/components/UpgradeButton";
import { useRouter } from "next/navigation";
import useSubscription from "../../hooks/useSubscription";
import { createStripePortal } from "../../actions/createStripePortal";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions/createStripePortal", () => ({
  createStripePortal: jest.fn(),
}));

jest.mock("../../hooks/useSubscription");

describe("UpgradeButton", () => {
  const mockUseSubscription = useSubscription as jest.MockedFunction<typeof useSubscription>;
  const mockCreateStripePortal = createStripePortal as jest.MockedFunction<typeof createStripePortal>;
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders upgrade link when user has no membership", () => {
    mockUseSubscription.mockReturnValue({
        hasActiveMembership: false,
        loading: false,
    } as unknown as ReturnType<typeof useSubscription>);

    render(<UpgradeButton />);
    const button = screen.getByRole("link", { name: /upgrade/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/dashboard/upgrade");
  });

  it("shows loading spinner when loading is true", () => {
    mockUseSubscription.mockReturnValue({
        hasActiveMembership: false,
        loading: true,
    } as unknown as ReturnType<typeof useSubscription>);

    render(<UpgradeButton />);
    expect(screen.getByRole("button")).toContainElement(screen.getByTestId("loader"));
  });

  it("shows PRO account button when membership is active", () => {
    mockUseSubscription.mockReturnValue({
        hasActiveMembership: true,
        loading: false,
    } as unknown as ReturnType<typeof useSubscription>);

    render(<UpgradeButton />);
    expect(screen.getByRole("button")).toHaveTextContent("PRO Account");
  });

  it("calls createStripePortal and redirects on click", async () => {
    mockUseSubscription.mockReturnValue({
        hasActiveMembership: true,
        loading: false,
    } as unknown as ReturnType<typeof useSubscription>);
  
    mockCreateStripePortal.mockResolvedValue("https://stripe.com/portal");
  
    render(<UpgradeButton />);
    const button = screen.getByRole("button");
  
    await act(async () => {
      fireEvent.click(button);
    });
  
    expect(mockCreateStripePortal).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("https://stripe.com/portal");
  });  
});
