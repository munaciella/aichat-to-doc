import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PricingPage from "@/app/dashboard/upgrade/page";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import getStripe from "@/lib/stripe-js";
import useSubscription from "../../hooks/useSubscription";
import { createCheckoutSession } from "../../actions/createCkeckoutSession";
import { createStripePortal } from "../../actions/createStripePortal";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../../hooks/useSubscription", () => jest.fn());
jest.mock("@/lib/stripe-js", () => jest.fn());
jest.mock("../../actions/createCkeckoutSession", () => ({
  createCheckoutSession: jest.fn(),
}));
jest.mock("../../actions/createStripePortal", () => ({
  createStripePortal: jest.fn(),
}));

describe("PricingPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useUser as jest.Mock).mockReturnValue({
      user: {
        primaryEmailAddress: "test@example.com",
        fullName: "Test User",
      },
    });
    (useSubscription as jest.Mock).mockReturnValue({
      hasActiveMembership: false,
      loading: false,
    });
    (getStripe as jest.Mock).mockResolvedValue({
      redirectToCheckout: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all 3 plans", () => {
    render(<PricingPage />);

    expect(screen.getByText("Starter Plan")).toBeInTheDocument();
    expect(screen.getByText("Pro Plan")).toBeInTheDocument();
    expect(screen.getByText("Ultimate Plan")).toBeInTheDocument();
  });

  it("calls checkout when upgrading from free", async () => {
    (createCheckoutSession as jest.Mock).mockResolvedValue("test_session_id");

    render(<PricingPage />);

    const upgradeButton = screen.getByRole("button", { name: /upgrade to pro/i });
    fireEvent.click(upgradeButton);

    await waitFor(() =>
      expect(createCheckoutSession).toHaveBeenCalledWith({
        email: "test@example.com",
        name: "Test User",
      })
    );
  });

  it("redirects to stripe portal if already subscribed", async () => {
    (useSubscription as jest.Mock).mockReturnValue({
      hasActiveMembership: true,
      loading: false,
    });
    (createStripePortal as jest.Mock).mockResolvedValue("https://stripe.com/portal");

    render(<PricingPage />);

    const manageBtn = screen.getByRole("button", { name: /manage subscription/i });
    fireEvent.click(manageBtn);

    await waitFor(() => expect(createStripePortal).toHaveBeenCalled());
  });
});
