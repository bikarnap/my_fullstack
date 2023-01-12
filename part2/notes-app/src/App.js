import axios from 'axios';
import { useEffect, useState } from 'react';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      });
  }, []);
  console.log('render', notes.length, 'notes');

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

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>show  {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(note => 
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
