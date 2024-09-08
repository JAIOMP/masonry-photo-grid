import React from 'react';
import { Link } from 'react-router-dom';

const Grid: React.FC = () => {
  // Replace with actual photo data
  const photos = [
    { id: '1', title: 'Photo 1' },
    { id: '2', title: 'Photo 2' },
    // more photos...
  ];

  return (
    <div>
      <h1>Photo Grid</h1>
      <div>
        {photos.map(photo => (
          <div key={photo.id}>
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
