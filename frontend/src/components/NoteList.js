import React, { useEffect, useState } from 'react';
import { getNotes, createNote } from '../api';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';

const NoteListContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const NoteInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 10px;
  background: white;
`;

const NoteList = ({ selectedGroup }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      if (selectedGroup) {
        const response = await getNotes(selectedGroup._id);
        setNotes(response.data);
      }
    };
    fetchNotes();
  }, [selectedGroup]);

  const handleCreateNote = async () => {
    if (newNote.trim()) {
      await createNote({ content: newNote, groupId: selectedGroup._id });
      setNewNote('');
      const response = await getNotes(selectedGroup._id);
      setNotes(response.data);
    }
  };

  return (
    <NoteListContainer>
      <h2>{selectedGroup ? selectedGroup.name : 'Select a group'}</h2>
      <List>
        {notes.map(note => (
          <ListItem key={note._id}>
            <ListItemText primary={note.content} secondary={new Date(note.createdAt).toLocaleString()} />
          </ListItem>
        ))}
      </List>
      {selectedGroup && (
        <NoteInputContainer>
          <TextField
            fullWidth
            placeholder="Enter your text here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!newNote.trim()}
            onClick={handleCreateNote}
          >
            Send
          </Button>
        </NoteInputContainer>
      )}
    </NoteListContainer>
  );
};

export default NoteList;
