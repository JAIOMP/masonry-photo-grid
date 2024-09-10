import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './Grid.css';
import SearchInput from '../SearchInput/SearchInput';
import { debounce } from '../../utils/debounce';

const Grid: React.FC = () => {
    const [query, setQuery] = useState('');
    const { photos, error, hasMore, setPage } = useInfiniteScroll(query);

    const handleSearch = debounce((value: string) => {
        setQuery(value);
        setPage(1);
      }, 300);

    return (
        <div>
            <h1>Photo Grid</h1>
            <SearchInput onSearch={handleSearch} />
            <div className="grid">
                {photos.map((photo) => {
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
                                        style={{ maxWidth: '100%' }}
                                    />
                                </picture>
                            </Link>
                        </div>
                    );
                })}
            </div>
            {error && <p>{error}</p>}
            {!hasMore && <p>No more photos to load</p>}
            <div id="sentinel" />
        </div>
    );
};

export default Grid;