import React, { useEffect, useState } from "react";
import API from "../api";

function NotesList() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    API.get("/notes").then(res => setNotes(res.data));
  }, []);
  return (
    <div>
      {notes.map(n => (
        <div key={n.id}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}
export default NotesList;
