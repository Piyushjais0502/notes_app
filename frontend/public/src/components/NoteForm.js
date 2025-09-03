import React, { useState, useEffect } from "react";
import API from "../api";

function NoteForm({ note = null, onSave }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (note) {
        await API.put(`/notes/${note.id}`, { title, content });
      } else {
        await API.post("/notes", { title, content });
      }
      setTitle("");
      setContent("");
      if (onSave) onSave();
    } catch (err) {
      alert("Error saving note");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
      <button type="submit">{note ? "Update" : "Add"} Note</button>
    </form>
  );
}

export default NoteForm;
