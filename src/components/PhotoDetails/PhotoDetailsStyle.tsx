import { Link } from "react-router-dom";
import { styled } from "styled-components";
import TagsIcon from '../../assets/tags.svg';
import PersonIcon from '../../assets/profile.svg';
import PublishedIcon from '../../assets/published.svg';

export const PhotoDetailsContainer = styled.div`
    h2 {
        margin: 0;
        font-size: 2rem;
        margin-bottom: 16px;
        color: var(--background-dark);
    }

    p {
        font-size: 1rem;
        margin-bottom: 12px;
        color: var(--text-secondary);

        strong {
            color: var(--text-primary);
        }
    }
`;

export const PhotoDetailsTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const BackLink = styled(Link)`
    font-size: 1rem;
    align-self: flex-start;
    background-color: var(--link-color);
    color: var(--text-light);
    padding: 8px 12px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 500;

    &:hover {
        background-color: var(--primary-blue-dark);
        color: var(--text-light);
    }
`;

export const PhotoDetailsBody = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-around;
    flex-direction: column;
    padding: 20px;
    margin: 0 auto;
    background-color: var(--background-light);
    box-shadow: 0 2px 10px var(--shadow-light);

    @media (min-width: 1025px) {
        flex-direction: row;
    }

    @media (max-width: 600px) {
        padding: 10px;
    }
`;

export const PhotoDetailsImage = styled.img`
    border-radius: 8px;
    box-shadow: 0 4px 8px var(--shadow-light);
    max-width: 100%;
`;

export const IconDetail = styled.div`
    display: flex;
    align-items: center;
`;

export const Tag = styled.span`
    background-color: var(--primary-blue);
    color: white;
    text-wrap: nowrap;
    margin-right: 5px;
    font-size: 0.875rem;
    padding: 5px 10px;
    border-radius: 20px;
    text-transform: capitalize;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--primary-blue-dark);
    }
`;

export const PhotoDetailsText = styled.div`
    font-size: 1rem;
    margin: 12px 0;
    color: var(--text-secondary);

    @media (max-width: 600px) {
        font-size: 0.875rem;
    }

    strong {
        color: var(--text-primary);
    }
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    fill: var(--text-secondary);
    margin-right: 8px;
  }
`;

export const StyledTagsIcon = styled(TagsIcon)``;

export const StyledPersonIcon = styled(PersonIcon)``;

export const StyledPublishedIcon = styled(PublishedIcon)``;
