// ...existing code...
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
// replaced: import SearchSection from './components/SearchBar/SearchBar';
import BackTestingPage from './pages/BackTestingPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<BackTestingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// ...existing code...