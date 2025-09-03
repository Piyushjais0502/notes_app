import React from 'react';

const NotesList = ({ notes, onSelectNote, activeNoteId }) => {
    return (
        <div className="notes-list">
            <h3>Your Notes</h3>
            {notes.map(note => (
                <div
                    key={note.id}
                    className={`note-item ${note.id === activeNoteId ? 'active' : ''}`}
                    onClick={() => onSelectNote(note.id)}
                >
                    <h4>{note.title}</h4>
                </div>
            ))}
        </div>
    );
};

export default NotesList;
