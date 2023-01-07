const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
};

const App = () => {
  const age = 21;
  return(
    <>
      <h1>Greetings</h1>
      <Hello name="Vicky" age={23 + 1} />
      <Hello name="Harry" age={age} />
    </>
  )
};


export default App;
