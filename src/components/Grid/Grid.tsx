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
                                <img src={photo.largeImageURL} loading="lazy" alt={photo.tags || 'Image'} />
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