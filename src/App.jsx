import HeaderTitle from "./HeaderTitle";
import TodoList from "./TodoList";
import "../src/App.css";

function App() {
  return (
    <>
      <div className="container custom-container p-4 my-4 min-vh-100">
        <div className="row">
          <HeaderTitle />
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
