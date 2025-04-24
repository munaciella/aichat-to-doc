import { render, screen } from "@testing-library/react";
import ChatToFilePage from "@/app/dashboard/files/[id]/page";
import { adminDb as mockAdminDb } from "../../firebaseAdmin";

jest.mock("@clerk/nextjs/server");
import { auth as mockAuthRaw } from "@clerk/nextjs/server";
const mockAuth = mockAuthRaw as unknown as jest.MockedFunction<() => Promise<{ userId: string | null }>>;



// Mock Firestore chaining
jest.mock("../../firebaseAdmin", () => ({
  adminDb: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            get: jest.fn(() => ({
              data: jest.fn(() => ({
                downloadUrl: "https://example.com/test.pdf",
              })),
            })),
          })),
        })),
      })),
    })),
  },
}));

// Mock components
jest.mock("@/components/Chat", () => {
  const Chat = ({ id }: { id: string }) => (
    <div data-testid="chat-component">Chat Component ID: {id}</div>
  );
  Chat.displayName = "MockChat";
  return Chat;
});

jest.mock("@/components/PdfView", () => {
  const PdfView = ({ url }: { url: string }) => (
    <div data-testid="pdf-view-component">PDF URL: {url}</div>
  );
  PdfView.displayName = "MockPdfView";
  return PdfView;
});

describe("ChatToFilePage", () => {
  it("renders Chat and PdfView when authenticated", async () => {
    mockAuth.mockResolvedValue({ userId: "user123" });

    const mockDoc = {
      data: () => ({ downloadUrl: "https://example.com/test.pdf" }),
    };

    (mockAdminDb.collection("users").doc("user123").collection("files").doc("file123").get as jest.Mock).mockResolvedValue(mockDoc);

    const Page = await ChatToFilePage({ params: { id: "file123" } });
    render(Page);

    expect(screen.getByTestId("chat-component")).toHaveTextContent("file123");
    expect(screen.getByTestId("pdf-view-component")).toHaveTextContent("https://example.com/test.pdf");
  });

  it("throws error if user is not authenticated", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    await expect(ChatToFilePage({ params: { id: "file123" } })).rejects.toThrow("Unauthorized: User not authenticated");
  });
});
