import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    API.get(`/notes/${id}`).then(res => setNote(res.data));
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <small>Created at: {note.created_at}</small>
    </div>
  );
}

export default NoteDetail;
