import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import PdfView from "@/components/PdfView";
import { useEffect } from "react";

// ✅ Mock fetch to return a fake PDF blob
global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve(new Blob(["dummy content"], { type: "application/pdf" })),
  })
) as jest.Mock;

// ✅ Fully mock react-pdf including pdfjs to avoid ESM + worker errors
jest.mock("react-pdf", () => ({
  Document: ({
    children,
    onLoadSuccess,
  }: {
    children: React.ReactNode;
    onLoadSuccess: (args: { numPages: number }) => void;
  }) => {
    useEffect(() => {
      onLoadSuccess({ numPages: 3 });
    }, [onLoadSuccess]);
    return <div data-testid="pdf-doc">{children}</div>;
  },
  Page: () => <div data-testid="pdf-page">Mock Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: "",
    },
    version: "3.0.0",
  },
}));

describe("PdfView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<PdfView url="https://example.com/test.pdf" />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("pdf-page")).toBeInTheDocument();
    });
  });

  it("fetches and renders PDF", async () => {
    await act(async () => {
      render(<PdfView url="https://example.com/test.pdf" />);
    });

    await waitFor(() => expect(screen.getByTestId("pdf-doc")).toBeInTheDocument());
    expect(screen.getByTestId("pdf-page")).toBeInTheDocument();
  });

  it("navigates pages correctly", async () => {
    await act(async () => {
      render(<PdfView url="https://example.com/test.pdf" />);
    });

    await waitFor(() => screen.getByTestId("pdf-doc"));

    const next = screen.getByRole("button", { name: /next/i });
    const prev = screen.getByRole("button", { name: /previous/i });

    fireEvent.click(next);
    expect(screen.getByText("2 of 3")).toBeInTheDocument();

    fireEvent.click(prev);
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  it("handles zoom in and out", async () => {
    await act(async () => {
      render(<PdfView url="https://example.com/test.pdf" />);
    });

    await waitFor(() => screen.getByTestId("pdf-doc"));

    const zoomIn = screen.getByRole("button", { name: /zoom in/i });
    const zoomOut = screen.getByRole("button", { name: /zoom out/i });

    fireEvent.click(zoomIn);
    fireEvent.click(zoomOut);

    expect(zoomIn).not.toBeDisabled();
    expect(zoomOut).not.toBeDisabled();
  });

  it("handles rotation", async () => {
    await act(async () => {
      render(<PdfView url="https://example.com/test.pdf" />);
    });

    await waitFor(() => screen.getByTestId("pdf-doc"));

    const rotate = screen.getByRole("button", { name: /rotate/i });
    fireEvent.click(rotate);

    expect(rotate).toBeEnabled();
  });
});
