import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import { PixabayPhoto } from '../../types';
import { PIXABAY_API_URL } from '../../constants/config';
import './PhotoDetails.css';
import axios from 'axios';

const PhotoDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = React.useState<PixabayPhoto | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                const response = await axios.get(PIXABAY_API_URL, {
                    params: { id },
                });
                console.log(response);
                const data = response.data.hits[0];
                setPhoto(data);
                console.log(data)
            } catch (err) {
                setError('Failed to load photo details');
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!photo) return <div>No photo found</div>;

    return (
        <div className="photo-details">
            <h1>Photo Details</h1>
            <img src={photo.webformatURL} alt={photo.tags} loading="lazy" />
            <p><strong>Title:</strong> {photo.tags}</p>
            <p><strong>Description:</strong> Description </p>
            <p><strong>Photographer:</strong> User </p>
            <p><strong>Published on:</strong> {formatDate(new Date().toDateString())}</p>
            <div className="back-link">
                <Link to="/">Back to Grid</Link>
            </div>
        </div>
    );
};

export default PhotoDetails;
