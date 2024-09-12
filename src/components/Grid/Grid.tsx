import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { debounce } from "../../utils/debounce";
import SearchInput from "../SearchInput/SearchInput";
import {
  getNumberOfColumns,
  splitItemsIntoColumns,
} from "../../utils/layoutUtils";
import { GrandParent, Parent, PhotoItem, PhotoItemImage } from "./GridStyle";

const Grid: React.FC = () => {
  const [numColumns, setNumColumns] = useState<number>(getNumberOfColumns());
  const [query, setQuery] = useState<string>("");

  const { photos, error, hasMore, setPage } = useInfiniteScroll(query);

  const handleSearch = debounce((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  useEffect(() => {
    const handleResize = () => setNumColumns(getNumberOfColumns());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = splitItemsIntoColumns(photos, numColumns);

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <GrandParent columns={numColumns}>
        {columns.map((column, columnIndex) => (
          <Parent key={columnIndex}>
            {column.map((photo) => (
              <PhotoItem key={photo.id}>
                <Link to={`/photo/${photo.id}`}>
                  <picture>
                    <source
                      media="(max-width: 600px)"
                      srcSet={photo.previewURL}
                    />
                    <source
                      media="(max-width: 1024px)"
                      srcSet={photo.webformatURL}
                    />
                    <PhotoItemImage
                      src={photo.largeImageURL}
                      alt={photo.tags}
                      loading="lazy"
                    />
                  </picture>
                </Link>
              </PhotoItem>
            ))}
          </Parent>
        ))}
      </GrandParent>
      {error && <p>{error}</p>}
      {!hasMore && <p>No more photos to load</p>}
      <div id="sentinel" />
    </div>
  );
};

export default Grid;
