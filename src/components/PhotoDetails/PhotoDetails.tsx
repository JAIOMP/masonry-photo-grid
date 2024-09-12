import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PixabayPhoto } from "../../types";
import { PIXABAY_API_URL } from "../../constants/config";
import {
  BackLink,
  IconDetail,
  IconWrapper,
  PhotoDetailsBody,
  PhotoDetailsContainer,
  PhotoDetailsImage,
  PhotoDetailsText,
  PhotoDetailsTitle,
  StyledPersonIcon,
  StyledPublishedIcon,
  StyledTagsIcon,
  Tag,
} from "./PhotoDetailsStyle";
import axios from "axios";
import { formatDate } from "../../utils/dateUtils";

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
        setError("Failed to load photo details");
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
    <PhotoDetailsContainer>
      <PhotoDetailsTitle>
        <h2>Photo Details</h2>
        <BackLink to="/">Back to Grid</BackLink>
      </PhotoDetailsTitle>
      <PhotoDetailsBody>
        <picture>
          <source media="(max-width: 600px)" srcSet={photo.webformatURL} />
          <source media="(max-width: 1024px)" srcSet={photo.largeImageURL} />
          <PhotoDetailsImage
            src={photo.largeImageURL}
            alt={photo.tags}
            loading="lazy"
          />
        </picture>
        <div>
          <IconDetail>
            <IconWrapper>
              <StyledTagsIcon />
            </IconWrapper>
            {photo.tags.split(", ").map((tag: string, index: number) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </IconDetail>
          <PhotoDetailsText>
            <IconWrapper>
              <StyledPersonIcon />
              {photo.user}
            </IconWrapper>
          </PhotoDetailsText>
          <PhotoDetailsText>
            <IconWrapper>
              <StyledPublishedIcon />
            </IconWrapper>
            Published on {formatDate(new Date().toDateString())}
          </PhotoDetailsText>
        </div>
      </PhotoDetailsBody>
    </PhotoDetailsContainer>
  );
};

export default PhotoDetails;
