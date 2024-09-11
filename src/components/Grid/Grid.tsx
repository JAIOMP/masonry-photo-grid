import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import "./Grid.css";
import { debounce } from '../../utils/debounce';
import { PixabayPhoto } from "../../types";
import SearchInput from "../SearchInput/SearchInput";

function splitItemsIntoColumns(items: PixabayPhoto[], numColumns: number) {
  const columns: PixabayPhoto[][] = Array.from(
    { length: numColumns },
    () => []
  );

  items.forEach((item: PixabayPhoto, index) => {
    const columnIndex = index % numColumns;
    columns[columnIndex].push(item as PixabayPhoto);
  });

  return columns;
}

function getNumberOfColumns() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    return 3;
  } else if (screenWidth >= 768) {
    return 2;
  } else {
    return 1;
  }
}

const Grid: React.FC = () => {
  const [numColumns, setNumColumns] = useState(getNumberOfColumns());
  const [query, setQuery] = useState('');
  
  const { photos, error, hasMore, setPage } = useInfiniteScroll(query);

  const handleSearch = debounce((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);


  useEffect(() => {
    const handleResize = () => {
      setNumColumns(getNumberOfColumns());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns: PixabayPhoto[][] = splitItemsIntoColumns(photos, numColumns);

  return (
    <div>
        <h1>Photo Grid</h1>
        
        <SearchInput onSearch={handleSearch} />
        
        <div className="grid grand-parent" style={{ '--columns' : numColumns}}>
        {columns.map((column, columnIndex) => (
            <div className="grid parent" key={columnIndex}>
            {column.map((photo) => {
                return (
                <div key={photo.id} className="item">
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
                        <img
                        src={photo.largeImageURL}
                        alt={photo.tags}
                        loading="lazy"
                        style={{ maxWidth: "100%" }}
                        />
                    </picture>
                    </Link>
                </div>
                );
            })}
            </div>
        ))}
        </div>
        {error && <p>{error}</p>}
        {!hasMore && <p>No more photos to load</p>}
        {/* Sentinel element */}
        <div id="sentinel" />
    </div>
  );
};

export default Grid;
