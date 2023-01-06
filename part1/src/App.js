const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
};

const App = () => (
  <div>
    <h1>Greetings</h1>
    <Hello name="GitHub"/>
    <Hello name="Gitlab" />
  </div>
);


export default App;
