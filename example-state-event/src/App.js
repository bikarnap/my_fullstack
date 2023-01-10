import { useState } from "react";

const Display = (props) => <div>{props.counter}</div>;
const Button = (props) => <button onClick={props.onClick}>{props.label}</button>;

function App(props) {
  const [ counter, setCounter ] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);

  const resetCounter = () => setCounter(0);


  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} label="plus" />
      <Button onClick={resetCounter} label="reset" />
      <Button onClick={decreaseByOne} label="minus" />
    </div>
    
  );
}

export default App;
