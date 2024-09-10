import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { PixabayPhoto } from '../types';
import { PIXABAY_API_URL } from '../constants/config';

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
            const response = await axios.get(PIXABAY_API_URL, {
                params: {
                    page,
                    per_page: 12,
                },
                cancelToken: cancelToken.token,
            });

            setPhotos((prevPhotos) => [...prevPhotos, ...response.data.hits]);
            setHasMore(response.data.hits.length > 0);
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

    useEffect(() => {
        const sentinel = document.getElementById('sentinel');

        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            {
                rootMargin: '100px',
            }
        );

        observer.observe(sentinel);

        return () => {
            observer.unobserve(sentinel);
        };
    }, [photos]);

    return { photos, loading, error, hasMore };
};

export default useInfiniteScroll;
