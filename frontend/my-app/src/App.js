import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './error-component/error-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ErrorPage />} />
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
