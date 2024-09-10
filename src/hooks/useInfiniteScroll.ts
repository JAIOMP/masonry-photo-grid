import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

const UNSPLASH_API_URL = 'https://pixabay.com/api/?key=45859066-ec83d92f5cac4687d1788b9e3';

interface PixabayPhoto {
    id: string;
    largeImageURL: string;
    tags: string;
}

const useInfiniteScroll = () => {
    const [photos, setPhotos] = useState<PixabayPhoto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    let cancelToken: CancelTokenSource | null = null;

    const fetchPhotos = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        // Cancel the previous request if it exists
        if (cancelToken) {
            cancelToken.cancel('Request cancelled due to new request.');
        }

        // Create a new CancelToken for the new request
        cancelToken = axios.CancelToken.source();

        try {
            const response = await axios.get(UNSPLASH_API_URL, {
                params: {
                    page,
                    per_page: 12,
                },
                cancelToken: cancelToken.token,
            });

            setPhotos((prevPhotos) => [...prevPhotos, ...response.data.hits]);
            setHasMore(response.data.hits.length > 0); // Set hasMore to false if no more photos
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request cancelled', err.message);
            } else {
                setError('Failed to load photos');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    // Infinite scrolling logic
    const loadMorePhotos = () => {
        const scrollThreshold = 500; // Start loading when user is 500px from the bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', loadMorePhotos);
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('scroll', loadMorePhotos);
      }, [photos]);

    return { photos, loading, error, hasMore };
};

export default useInfiniteScroll;
