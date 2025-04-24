/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import ChatMessagePage from "@/components/ChatMessagePage";
import { useUser } from "@clerk/nextjs";
import { Message } from "@/components/Chat";

// 🧪 Mock Clerk
jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

// 🧪 Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// 🧪 Mock Markdown
jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown">{children}</div>
  ),
}));

describe("ChatMessagePage", () => {
  const mockUseUser = useUser as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a user message with profile image", () => {
    mockUseUser.mockReturnValue({
      user: {
        imageUrl: "https://example.com/avatar.jpg",
      },
    });

    const message: Message = {
      role: "human",
      message: "Hello world!",
      createdAt: new Date(),
    };

    render(<ChatMessagePage message={message} />);
    expect(screen.getByAltText("User profile picture")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });

  it("renders a user message with placeholder if no image", () => {
    mockUseUser.mockReturnValue({ user: null });

    const message: Message = {
      role: "human",
      message: "Hello again!",
      createdAt: new Date(),
    };

    render(<ChatMessagePage message={message} />);
    expect(screen.getByText("Hello again!")).toBeInTheDocument();
    expect(screen.queryByAltText("User profile picture")).not.toBeInTheDocument();
  });

  it("renders bot message with icon", () => {
    mockUseUser.mockReturnValue({ user: null });

    const message: Message = {
      role: "ai",
      message: "I am the bot!",
      createdAt: new Date(),
    };

    render(<ChatMessagePage message={message} />);
    expect(screen.getByText("I am the bot!")).toBeInTheDocument();
    expect(screen.queryByAltText("User profile picture")).not.toBeInTheDocument();
  });

  it('renders loading spinner if message is "Thinking..."', () => {
    mockUseUser.mockReturnValue({ user: null });

    const message: Message = {
      role: "ai",
      message: "Thinking...",
      createdAt: new Date(),
    };

    render(<ChatMessagePage message={message} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
