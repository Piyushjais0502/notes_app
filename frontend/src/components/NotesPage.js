import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getNotes } from '../api';
import NotesList from './NotesList';
import NoteDetail from './NoteDetail';
import NoteForm from './NoteForm';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editingNote, setEditingNote] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const id = pathParts[2];
        if (id && id !== 'new' && id !== 'edit') {
            const note = notes.find(n => n.id === parseInt(id));
            setSelectedNote(note);
            setEditingNote(null);
        } else if (id === 'new') {
            setSelectedNote(null);
            setEditingNote({});
        } else if (id === 'edit' && pathParts[3]) {
             const noteToEdit = notes.find(n => n.id === parseInt(pathParts[3]));
             if(noteToEdit) {
                setSelectedNote(noteToEdit);
                setEditingNote(noteToEdit);
             }
        } else {
            setSelectedNote(null);
            setEditingNote(null);
        }
    }, [location.pathname, notes]);

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch notes", error);
        }
    };

    const handleSelectNote = (id) => {
        navigate(`/notes/${id}`);
    };

    const handleEdit = (note) => {
        navigate(`/notes/edit/${note.id}`);
    };

    const handleSave = (savedNote) => {
        fetchNotes();
        navigate(`/notes/${savedNote.id}`);
    };
    
    const handleDeleted = (deletedNoteId) => {
        setNotes(notes.filter(n => n.id !== deletedNoteId));
        navigate('/notes');
    };

    return (
        <div>
            <div className="navbar">
                <h1>Notes App</h1>
                <div>
                    <button onClick={() => navigate('/notes/new')} className="btn">New Note</button>
                </div>
            </div>
            <div className="notes-page">
                <div className="notes-list">
                    <NotesList
                        notes={notes}
                        onSelectNote={handleSelectNote}
                        activeNoteId={selectedNote?.id}
                    />
                </div>
                <div className="note-content">
                    <Routes>
                        <Route path="/" element={<div>Select a note to view or create a new one.</div>} />
                        <Route path=":id" element={<NoteDetail note={selectedNote} onEdit={handleEdit} onDeleted={handleDeleted} />} />
                        <Route path="new" element={<NoteForm onSave={handleSave} />} />
                        <Route path="edit/:id" element={<NoteForm currentNote={editingNote} onSave={handleSave} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default NotesPage;

