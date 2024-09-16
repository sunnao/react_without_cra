const App = () => {
  return <h1>HELLO </h1>
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* 
ReactDOM.render(<App />, document.getElementById("root"));
*/
