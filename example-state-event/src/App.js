import { useState } from "react";

function App(props) {
  const [ counter, setCounter ] = useState(0);

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div>
      <div> {counter} </div>
      <button onClick={handleClick}>plus</button>
    </div>
    
  );
}

export default App;
