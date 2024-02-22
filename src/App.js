import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ErrorDetailsPage from './components/ErrorDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/error-details-page/:id"  element={<ErrorDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
