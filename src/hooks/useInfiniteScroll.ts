import { useState, useEffect } from 'react';
import axios from 'axios';

const UNSPLASH_API_URL = 'https://unsplash.com/napi/photos';

interface Photo {
    id: string;
    urls: {
        regular: string;
    };
    alt_description: string;
}

const useInfiniteScroll = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true); // To prevent loading after reaching the end
    const [error, setError] = useState<string | null>(null);

    const fetchPhotos = async () => {
        if (loading || !hasMore) return; // Prevent fetching while loading or when no more data
        setLoading(true);

        try {
            const response = await axios.get(`${UNSPLASH_API_URL}`, {
                params: {
                    page,
                    per_page: 12,
                },
            });
            if (response.data.length === 0) {
                setHasMore(false); // No more photos to load
            } else {
                setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
            }
        } catch (err) {
            setError('Failed to load photos');
        } finally {
            setLoading(false);
        }
    };

    const dummyphotos = [
        {
            "id": "eOLpJytrbsQ",
            "created_at": "2014-11-18T14:35:36-05:00",
            "width": 4000,
            "height": 3000,
            "color": "#A7A2A1",
            "description": "A man drinking a coffee.",
            "urls": {
                "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
                "full": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=85",
                "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=200"
            },
            "user": {
                "name": "John Doe",
                "portfolio_url": "https://unsplash.com/@johndoe",
                "bio": "Photographer & coffee lover",
                "location": "New York City"
            }
        },
        {
            "id": "Y8riNmDqGRM",
            "created_at": "2015-06-12T14:35:36-05:00",
            "width": 3648,
            "height": 2736,
            "color": "#A7A2A1",
            "description": "A serene lake surrounded by mountains.",
            "urls": {
                "raw": "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
                "full": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=85",
                "regular": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=200"
            },
            "user": {
                "name": "Jane Smith",
                "portfolio_url": "https://unsplash.com/@janesmith",
                "bio": "Landscape photographer",
                "location": "Lake Tahoe"
            }
        },
        {
            "id": "eOLpJytrbsQ",
            "created_at": "2014-11-18T14:35:36-05:00",
            "width": 4000,
            "height": 3000,
            "color": "#A7A2A1",
            "description": "A man drinking a coffee.",
            "urls": {
                "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
                "full": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=85",
                "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=200"
            },
            "user": {
                "name": "John Doe",
                "portfolio_url": "https://unsplash.com/@johndoe",
                "bio": "Photographer & coffee lover",
                "location": "New York City"
            }
        },
        {
            "id": "Y8riNmDqGRM",
            "created_at": "2015-06-12T14:35:36-05:00",
            "width": 3648,
            "height": 2736,
            "color": "#A7A2A1",
            "description": "A serene lake surrounded by mountains.",
            "urls": {
                "raw": "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
                "full": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=85",
                "regular": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=200"
            },
            "user": {
                "name": "Jane Smith",
                "portfolio_url": "https://unsplash.com/@janesmith",
                "bio": "Landscape photographer",
                "location": "Lake Tahoe"
            }
        },
        {
            "id": "eOLpJytrbsQ",
            "created_at": "2014-11-18T14:35:36-05:00",
            "width": 4000,
            "height": 3000,
            "color": "#A7A2A1",
            "description": "A man drinking a coffee.",
            "urls": {
                "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
                "full": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=85",
                "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=200"
            },
            "user": {
                "name": "John Doe",
                "portfolio_url": "https://unsplash.com/@johndoe",
                "bio": "Photographer & coffee lover",
                "location": "New York City"
            }
        },
        {
            "id": "Y8riNmDqGRM",
            "created_at": "2015-06-12T14:35:36-05:00",
            "width": 3648,
            "height": 2736,
            "color": "#A7A2A1",
            "description": "A serene lake surrounded by mountains.",
            "urls": {
                "raw": "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
                "full": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=85",
                "regular": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=1080",
                "small": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=400",
                "thumb": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTI3MzN8MHwxfGFsbHwxfHx8fHx8fHwxNjExNjE3MzYz&ixlib=rb-1.2.1&q=80&w=200"
            },
            "user": {
                "name": "Jane Smith",
                "portfolio_url": "https://unsplash.com/@janesmith",
                "bio": "Landscape photographer",
                "location": "Lake Tahoe"
            }
        }];

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    const loadMorePhotos = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return { photos: dummyphotos, loading, error, loadMorePhotos, hasMore };
};

export default useInfiniteScroll;