import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotesPage from './components/NotesPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/notes/*" element={<NotesPage />} />
          <Route path="*" element={<Navigate to="/notes" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

