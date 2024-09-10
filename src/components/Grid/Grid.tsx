import React from 'react';
import { Link } from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './Grid.css';

const Grid: React.FC = () => {
    const { photos, error, hasMore } = useInfiniteScroll();

    return (
        <div>
            <h1>Photo Grid</h1>
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
            {/* Sentinel element */}
            <div id="sentinel" />
        </div>
    );
};

export default Grid;