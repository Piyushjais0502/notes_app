import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import NoteDetail from "./components/NoteDetail";
import LoginForm from "./components/LoginForm";
import { isLoggedIn } from "./utils/auth";

function App() {
  const loggedIn = isLoggedIn();

  return (
    <Router>
      {loggedIn ? (
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Routes>
      ) : (
        <LoginForm />
      )}
    </Router>
  );
}

export default App;
