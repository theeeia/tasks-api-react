import TodoList from "./components/TodoList"
import {TodoProvider} from "./context/TodoContext"

function App() {


  return (
    <TodoProvider>
      <TodoList>

      </TodoList>

    </TodoProvider>
    
  );
}

export default App;
