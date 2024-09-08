import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Grid from './components/Grid';
import PhotoDetails from './components/PhotoDetails';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/photo/:id" element={<PhotoDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
