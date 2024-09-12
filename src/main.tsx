import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundry/ErrorBoundary';
import { GlobalStyle } from './GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <ErrorBoundary>
      <h1 className="header">Photo Grid</h1>
      <Layout>
        <AppRouter />
      </Layout>
    </ErrorBoundary>
  </StrictMode>,
)
