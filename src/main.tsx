import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './router';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundry/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>  
      <h1 className="header">Photo Grid</h1>
      <Layout>
        <AppRouter />
      </Layout>
    </ErrorBoundary>
  </StrictMode>,
)
