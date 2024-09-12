import { styled } from "styled-components";

export const ErrorBoundaryWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--text-light);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ErrorContent = styled.div`
  background: var(--background-light);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--overlay-color);
  text-align: center;
`;

export const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: var(--error-color);
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: var(--text-primary);
`;

export const RetryButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: var(--link-color);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-blue-dark);
  }
`;
