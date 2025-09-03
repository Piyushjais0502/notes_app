import React, { useState, useEffect } from "react";
import API from "../api";
import NoteForm from "./NoteForm";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async () => {
    const res = await API.post("/notes/search", { query });
    setSearchResults(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Your Notes</h1>
      <NoteForm note={editingNote} onSave={() => { setEditingNote(null); fetchNotes(); }} />

      {/* Search */}
      <div style={{ margin: "20px 0" }}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search notes..." />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map(n => (
            <div key={n.id} style={{ border: "1px solid #ccc", margin: "5px 0", padding: "5px" }}>
              <p>{n.content}</p>
              <a href={`/notes/${n.id}`}>View</a>
            </div>
          ))}
        </div>
      )}

      {/* Notes List */}
      <div>
        {notes.map(n => (
          <div key={n.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <button onClick={() => handleEdit(n)}>Edit</button>
            <button onClick={() => handleDelete(n.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
