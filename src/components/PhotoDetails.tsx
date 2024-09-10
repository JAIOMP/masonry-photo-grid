import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PhotoDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Replace with actual photo data fetching
    const photo = {
        "id": id,
        "created_at": "2014-11-18T14:35:36-05:00",
        "width": 4000,
        "height": 3000,
        "color": "#A7A2A1",
        title: "A Man",
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
    };

    return (
        <div>
            <h1>Photo Details</h1>
            <img src={photo.urls.small} loading="lazy" />
            <p><strong>Title:</strong> {photo.title}</p>
            <p><strong>Description:</strong> {photo.description}</p>
            <p><strong>Photographer:</strong> {photo.user.name}</p>
            <p><strong>Published on</strong> new Date(photo.created_at)</p>
            <Link to="/">Back to Grid</Link>
        </div>
    );
};

export default PhotoDetails;
