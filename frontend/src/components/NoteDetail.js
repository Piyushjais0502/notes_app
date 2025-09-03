import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../api';

const NoteDetail = ({ note, onEdit, onDeleted }) => {
    const navigate = useNavigate();

    if (!note) {
        return <div>Select a note to view</div>;
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            await deleteNote(note.id);
            onDeleted(note.id);
            navigate('/notes');
        }
    };

    return (
        <div className="note-detail">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <small>Created: {new Date(note.created_at).toLocaleString()}</small>
            <br />
            {note.updated_at && <small>Updated: {new Date(note.updated_at).toLocaleString()}</small>}
            <div style={{ marginTop: '20px' }}>
                <button className="btn" onClick={() => onEdit(note)}>Edit</button>
                <button className="btn" style={{ background: '#e74c3c' }} onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default NoteDetail;
