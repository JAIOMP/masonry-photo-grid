import React, { Component, ErrorInfo } from 'react';
import './ErrorBoundary.css';
import { ErrorBoundaryWrapper, ErrorContent, ErrorMessage, ErrorTitle, RetryButton } from './ErrorBoundryStyle';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryWrapper>
          <ErrorContent>
            <ErrorTitle>Something went wrong</ErrorTitle>
            <ErrorMessage>
              We're sorry, but an unexpected error occurred. Please try again later.
            </ErrorMessage>
            <RetryButton onClick={this.handleReset}>Retry</RetryButton>
          </ErrorContent>
        </ErrorBoundaryWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
