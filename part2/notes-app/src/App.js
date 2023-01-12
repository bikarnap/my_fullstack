import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };
    setNotes(notes.concat(noteObject));
    setNewNote('');

  }

  const handleOnChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note 
           key={note.id} 
           note={note.content} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleOnChange} value={newNote}/>
        <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default App;
