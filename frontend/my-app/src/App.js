import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ErrorPage from './error-component/error-page';
import FrontPage from './frontpage-component/frontpage';
import ForYou from './forYou/forYou';
import Home from './home/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/ForYou" element={<ForYou />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
