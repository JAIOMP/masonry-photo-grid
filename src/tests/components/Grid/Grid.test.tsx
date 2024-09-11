import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Grid from "../../../components/Grid/Grid.tsx";
import { debounce, getNumberOfColumns } from "../../../utils/debounce.ts";
import { BrowserRouter } from "react-router-dom";
import * as hooks from "../../../hooks/useInfiniteScroll";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { PixabayPhoto } from "../../../types/index.ts";

vi.mock("../../../hooks/useInfiniteScroll");

vi.mock("../../../utils/debounce", () => ({
  debounce: vi.fn((fn) => fn),
  getNumberOfColumns: vi.fn(() => 3),
  splitItemsIntoColumns: vi.fn((items, numColumns) => {
    const columns: PixabayPhoto[][] = Array.from({ length: numColumns }, () => []);
    items.forEach((item: PixabayPhoto, index: number) => {
      columns[index % numColumns].push(item);
    });
    return columns;
  }),
}));

const mockPhotos = [
  {
    id: 1,
    previewURL: "preview1.jpg",
    webformatURL: "webformat1.jpg",
    largeImageURL: "largeImage1.jpg",
    tags: "photo 1",
  },
  {
    id: 2,
    previewURL: "preview2.jpg",
    webformatURL: "webformat2.jpg",
    largeImageURL: "largeImage2.jpg",
    tags: "photo 2",
  },
];

describe("Grid Component", () => {
  beforeEach(() => {
    vi.spyOn(hooks, "default").mockReturnValue({
      photos: [
        {
          id: 1,
          previewURL: "preview1.jpg",
          webformatURL: "webformat1.jpg",
          largeImageURL: "largeImage1.jpg",
          tags: "photo 1",
          pageURL: "",
          type: "",
          previewWidth: 0,
          previewHeight: 0,
          webformatWidth: 0,
          webformatHeight: 0,
          fullHDURL: "",
          imageURL: "",
          imageWidth: 0,
          imageHeight: 0,
          imageSize: 0,
          views: 0,
          downloads: 0,
          likes: 0,
          comments: 0,
          user_id: 0,
          user: "",
          userImageURL: "",
        },
        {
          id: 2,
          previewURL: "preview2.jpg",
          webformatURL: "webformat2.jpg",
          largeImageURL: "largeImage2.jpg",
          tags: "photo 2",
          pageURL: "",
          type: "",
          previewWidth: 0,
          previewHeight: 0,
          webformatWidth: 0,
          webformatHeight: 0,
          fullHDURL: "",
          imageURL: "",
          imageWidth: 0,
          imageHeight: 0,
          imageSize: 0,
          views: 0,
          downloads: 0,
          likes: 0,
          comments: 0,
          user_id: 0,
          user: "",
          userImageURL: "",
        },
      ],
      error: null,
      hasMore: true,
      setPage: vi.fn(),
      loading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks()
  })

  test("renders the SearchInput component", () => {
    render(
      <BrowserRouter>
        <Grid />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search for photos...");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders photos correctly", () => {
    render(
      <BrowserRouter>
        <Grid />
      </BrowserRouter>
    );

    mockPhotos.forEach((photo) => {
      const img = screen.getByAltText(photo.tags);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", photo.largeImageURL);
    });
  });

  test("should call the search function when typing in search", async () => {
    const mockDebounce = (debounce as vi.Mock).mockImplementation((fn) => fn);

    render(
      <BrowserRouter>
        <Grid />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search for photos...");
    fireEvent.change(searchInput, { target: { value: "nature" } });

    await waitFor(() => {
      expect(mockDebounce).toHaveBeenCalled();
    });
  });

  test("displays 'No more photos to load' when hasMore is false", () => {
    vi.spyOn(hooks, "default").mockReturnValue({
      photos: mockPhotos,
      error: null,
      hasMore: false,
      setPage: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Grid />
      </BrowserRouter>
    );

    expect(screen.getByText("No more photos to load")).toBeInTheDocument();
  });

  test("displays an error message when there is an error", () => {
    vi.spyOn(hooks, "default").mockReturnValue({
      photos: [],
      error: "Failed to fetch photos",
      hasMore: true,
      setPage: vi.fn(),
      loading: false,
    });

    render(
      <BrowserRouter>
        <Grid />
      </BrowserRouter>
    );

    expect(screen.getByText("Failed to fetch photos")).toBeInTheDocument();
  });

  test("adjusts number of columns on window resize", async () => {
    (getNumberOfColumns as vi.Mock)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4);

    render(
      <BrowserRouter>
        <Grid />
      </BrowserRouter>
    );

    expect(getNumberOfColumns).toHaveBeenCalledTimes(1);

    fireEvent(window, new Event("resize"));

    await waitFor(() => {
      expect(getNumberOfColumns).toHaveBeenCalledTimes(3);
    });
  });
});
