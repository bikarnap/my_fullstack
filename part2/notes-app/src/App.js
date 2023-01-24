import { useEffect, useState } from 'react';
import Note from './components/Note';
import notesService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    notesService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };
    
    notesService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });

  }

  const handleOnChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important }

    notesService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>show  {showAll ? 'important' : 'all'}</button>
      <ul>
        {notesToShow.map(note => 
          <Note 
           key={note.id} 
           note={note} 
           toggleImportance={() => toggleImportance(note.id)}
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
