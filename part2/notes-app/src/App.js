import { useEffect, useState } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import notesService from './services/notes';

import './index.css';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(note => note.id !== id))
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification
        message={errorMessage}
      />
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
      <Footer />
    </div>
  );
}

export default App;
