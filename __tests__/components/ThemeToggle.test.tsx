import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

describe("ThemeToggle", () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({ setTheme: mockSetTheme });
  });

  it("renders the toggle button with sun/moon icons", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });

    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeTruthy();
  });

  it("calls setTheme('light') when Light is clicked", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });

    await userEvent.click(button); // open dropdown
    await userEvent.click(screen.getByText("Light"));

    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme('dark') when Dark is clicked", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });

    await userEvent.click(button);
    await userEvent.click(screen.getByText("Dark"));

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme('system') when System is clicked", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });

    await userEvent.click(button);
    await userEvent.click(screen.getByText("System"));

    expect(mockSetTheme).toHaveBeenCalledWith("system");
  });
});
