import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PhotoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Replace with actual photo data fetching
  const photo = { id, title: 'Photo Title', description: 'Photo Description' };

  return (
    <div>
      <h1>Photo Details</h1>
      <p><strong>Title:</strong> {photo.title}</p>
      <p><strong>Description:</strong> {photo.description}</p>
      <Link to="/">Back to Grid</Link>
    </div>
  );
};

export default PhotoDetails;
