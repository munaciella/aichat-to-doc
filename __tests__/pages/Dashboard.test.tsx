import { render, screen } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";

// Mock the child components
jest.mock("@/components/DashboardClient", () => {
    const MockComponent = () => <div data-testid="dashboard-client" />;
    MockComponent.displayName = "MockDashboardClient";
    return MockComponent;
  });
  
  jest.mock("@/components/Documents", () => {
    const MockComponent = () => <div data-testid="documents" />;
    MockComponent.displayName = "MockDocuments";
    return MockComponent;
  });
  

describe("DashboardPage", () => {
  it("renders the dashboard page with title and components", () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { name: /my documents/i })).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-client")).toBeInTheDocument();
    expect(screen.getByTestId("documents")).toBeInTheDocument();
  });
});
