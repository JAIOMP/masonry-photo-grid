import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import "./Grid.css";
import { debounce, getNumberOfColumns, splitItemsIntoColumns } from '../../utils/debounce';
import { PixabayPhoto } from "../../types";
import SearchInput from "../SearchInput/SearchInput";

const Grid: React.FC = () => {
    const [numColumns, setNumColumns] = useState<number>(getNumberOfColumns());
    const [query, setQuery] = useState<string>('');

    const { photos, error, hasMore, setPage } = useInfiniteScroll(query);

    const handleSearch = debounce((value: string) => {
        setQuery(value);
        setPage(1);
    }, 300);


    useEffect(() => {
        const handleResize = () => setNumColumns(getNumberOfColumns());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const columns = splitItemsIntoColumns(photos, numColumns);

    return (
        <div>
            <SearchInput onSearch={handleSearch} />

            <div className="grid grand-parent" style={{ '--columns': numColumns } as React.CSSProperties}>
                {columns.map((column, columnIndex) => (
                    <div className="grid parent" key={columnIndex}>
                        {column.map((photo) => <PhotoItem photo={photo} key={photo.id} />)}
                    </div>
                ))}
            </div>
            {error && <p>{error}</p>}
            {!hasMore && <p>No more photos to load</p>}
            <div id="sentinel" />
        </div>
    );
};
interface PhotoItemProps {
    photo: PixabayPhoto;
}

const PhotoItem = React.memo(({ photo }: PhotoItemProps) => {
    return <div className="photo-item">
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
                    style={{ maxWidth: '100%' }}
                />
            </picture>
        </Link>
    </div>
});

export default Grid;
