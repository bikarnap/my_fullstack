import { useState } from "react";

function App(props) {
  const [ counter, setCounter ] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <div>
      <div> {counter} </div>
      <button onClick={handleClick}>plus</button>
      <button onClick={resetCounter}>zero</button>
    </div>
    
  );
}

export default App;
