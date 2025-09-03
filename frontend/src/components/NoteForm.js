import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../api';

const NoteForm = ({ currentNote, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [currentNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = { title, content };
        
        try {
            let savedNote;
            if (currentNote) {
                savedNote = await updateNote(currentNote.id, noteData);
            } else {
                savedNote = await createNote(noteData);
            }
            onSave(savedNote.data);
        } catch (error) {
            console.error("Failed to save note", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <h3>{currentNote ? 'Edit Note' : 'Create New Note'}</h3>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="10"
            ></textarea>
            <button type="submit">Save Note</button>
        </form>
    );
};

export default NoteForm;
