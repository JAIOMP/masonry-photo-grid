import styled from 'styled-components';

export const GrandParent = styled.div<{ columns: number }>`
  display: grid;
  grid-column-gap: 24px;
  align-items: start;
  grid-template-columns: repeat(${(props) => props.columns}, minmax(0, 1fr));
`;

export const Parent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: 24px;
`;

export const PhotoItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--shadow-light);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px var(--shadow-light);

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-overlay);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: "Click to view";
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--text-light);
    font-size: 16px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

export const PhotoItemImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: inherit;
  transition: transform 0.3s ease;

  ${PhotoItem}:hover & {
    transform: scale(1.1);
  }
`;
