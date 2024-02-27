import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ErrorDetailsPage from './components/ErrorDetailsPage';
import PostmanHit from './components/PostmanHit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/error-details-page/:id"  element={<ErrorDetailsPage />} />
        <Route path="/api" element={<PostmanHit />} />
      </Routes>
    </Router>
  );
}

export default App;
