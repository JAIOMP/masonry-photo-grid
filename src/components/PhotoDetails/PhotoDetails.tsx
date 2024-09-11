import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PixabayPhoto } from '../../types';
import { PIXABAY_API_URL } from '../../constants/config';
import PublishedIcon from '../../assets/published.svg';
import TagsIcon from '../../assets/tags.svg';
import PersonIcon from '../../assets/profile.svg';
import './PhotoDetails.css';
import axios from 'axios';
import { formatDate } from '../../utils/dateUtils';

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

                const data = response.data.hits[0];
                setPhoto(data);

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
        <div className='photo-details-container'>
            <div className="photo-details-title">
                <h2>Photo Details</h2>
                <div className="back-link">
                    <Link to="/">Back to Grid</Link>
                </div>
            </div>
            <div className="photo-details">
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
                <div>
                    <div className="icon-detail">
                        <TagsIcon className="icon" /> 
                        {photo.tags.split(', ').map((tag: string, index: number) => <span key={index} className='tag'>{tag}</span>)} 
                    </div>
                    <p className="icon-detail"><PersonIcon className='icon' /> {photo.user} </p>
                    <p className="icon-detail"><PublishedIcon className="icon" />Published on {formatDate(new Date().toDateString())}</p>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetails;
