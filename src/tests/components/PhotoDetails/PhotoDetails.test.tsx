import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { afterEach, describe, expect, test, vi } from "vitest";
import PhotoDetails from "../../../components/PhotoDetails/PhotoDetails";

vi.mock("axios");
const mockedAxios = axios as vi.Mock<typeof axios>;

describe("PhotoDetails Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state", () => {
    mockedAxios.get.mockReturnValue(new Promise(() => {}));

    render(
      <BrowserRouter>
        <PhotoDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    mockedAxios.get.mockRejectedValue(
      new Error("Failed to load photo details")
    );

    render(
      <BrowserRouter>
        <PhotoDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load photo details")
      ).toBeInTheDocument();
    });
  });

  test("renders photo details successfully", async () => {
    const mockPhoto = {
      id: 1,
      previewURL: "https://example.com/preview.jpg",
      webformatURL: "https://example.com/webformat.jpg",
      largeImageURL: "https://example.com/large.jpg",
      tags: "nature, forest, trees",
      user: "TestUser",
      date: "2023-09-12",
    };

    mockedAxios.get.mockResolvedValue({
      data: { hits: [mockPhoto] },
    });

    render(
      <BrowserRouter>
        <PhotoDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole("img")[0]).toHaveAttribute(
        "src",
        mockPhoto.largeImageURL
      );
    });

    expect(screen.getByText("nature")).toBeInTheDocument();
    expect(screen.getByText("forest")).toBeInTheDocument();
    expect(screen.getByText("trees")).toBeInTheDocument();

    expect(screen.getByText("TestUser")).toBeInTheDocument();

    expect(screen.getByText("Back to Grid")).toBeInTheDocument();
  });

  test('renders "No photo found" if photo data is null', async () => {
    mockedAxios.get.mockResolvedValue({ data: { hits: [] } });

    render(
      <BrowserRouter>
        <PhotoDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No photo found")).toBeInTheDocument();
    });
  });
});
