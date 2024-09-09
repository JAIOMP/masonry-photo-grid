import React, { useRef } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './Grid.css';
import { Link } from 'react-router-dom';

const Grid: React.FC = () => {
    const { photos, loading, error, hasMore } = useInfiniteScroll();
    const loader = useRef<HTMLDivElement | null>(null);

    return (
        <div>
            <h1>Photo Grid</h1>
            <div className="grid">
                {photos.map((photo) => {
                    // Calculate the span based on the image aspect ratio
                    const span = Math.ceil(photo.height / photo.width * 10); // Use a multiplier for fine-tuning
                    return (
                        <div key={photo.id} className="item" style={{ '--span': span }}>
                            <Link to={`/photo/${photo.id}`}>
                                <img src={photo.urls.regular} loading="lazy" alt={photo.description || 'Image'} />
                            </Link>
                        </div>
                    );
                })}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!hasMore && <p>No more photos to load</p>}
            <div ref={loader} className="loader" />
        </div>
    );
};

export default Grid;