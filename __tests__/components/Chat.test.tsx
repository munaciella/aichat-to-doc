import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat, { Message } from "@/components/Chat";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { askQuestion } from "../../actions/askQuestion";

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  
// Mocks
jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

jest.mock("react-firebase-hooks/firestore", () => ({
  useCollection: jest.fn(),
}));

jest.mock("../../actions/askQuestion", () => ({
  askQuestion: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/components/ChatMessagePage", () => ({
  __esModule: true,
  default: ({ message }: { message: Message }) => (
    <div data-testid="chat-message">{message.message}</div>
  ),
}));

describe("Chat component", () => {
  const mockUseUser = useUser as jest.Mock;
  const mockUseCollection = useCollection as jest.Mock;
  const mockAskQuestion = askQuestion as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUser.mockReturnValue({
      user: { id: "123", imageUrl: "" },
    });

    mockUseCollection.mockReturnValue([null, false, null]); // no messages yet
  });

  it("renders loading spinner while loading", () => {
    mockUseCollection.mockReturnValue([null, true, null]);

    render(<Chat id="abc123" />);
    expect(screen.getByTestId("chat-loader")).toBeInTheDocument();
});

  it("renders placeholder when no messages", () => {
    render(<Chat id="abc123" />);
    expect(screen.getByTestId("chat-message")).toHaveTextContent("Ask me anything about the document!");
  });

  it("submits a question and shows thinking state", async () => {
    mockAskQuestion.mockResolvedValue({ success: true });

    render(<Chat id="abc123" />);
    const input = screen.getByPlaceholderText("Ask a Question...");
    const button = screen.getByRole("button", { name: "Ask" });

    fireEvent.change(input, { target: { value: "What is AI?" } });
    fireEvent.click(button);

    await waitFor(() => {
      const messages = screen.getAllByTestId("chat-message");
      expect(messages).toHaveLength(2); // user question + "Thinking..."
      expect(messages[0]).toHaveTextContent("What is AI?");
      expect(messages[1]).toHaveTextContent("Thinking...");
    });
  });

  it("handles askQuestion failure gracefully", async () => {
    mockAskQuestion.mockResolvedValue({
      success: false,
      message: "Upgrade required",
    });

    render(<Chat id="abc123" />);
    const input = screen.getByPlaceholderText("Ask a Question...");
    const button = screen.getByRole("button", { name: "Ask" });

    fireEvent.change(input, { target: { value: "Tell me more!" } });
    fireEvent.click(button);

    await waitFor(() => {
      const messages = screen.getAllByTestId("chat-message");
      expect(messages[1]).toHaveTextContent("Whoops... Upgrade required");
    });
  });
});
