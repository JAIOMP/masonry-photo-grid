import styled, { keyframes } from "styled-components";

export const showText = keyframes`
  to {
    width: 100%;
  }
`;

export const StyledSearchBar = styled.input`
  margin: 20px 0;
  width: 60%;
  max-width: 600px;
  padding: 12px 20px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
  font-size: 1rem;
  outline: none;
  box-shadow: 0 2px 8px var(--shadow-light);
  width: 0;
  animation: ${showText} 7s 0s forwards;

  &:focus {
    box-shadow: 0 4px 12px var(--input-focus-shadow);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;