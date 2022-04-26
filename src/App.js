import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TodoList from "./components/TodoList"
import UserDetails from './components/UserDetails';


function App() {


  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<TodoList/>}> </Route>
      <Route exact path="/users/:id" element={<UserDetails/>} ></Route>
    </Routes>
  </Router>
     
  );
}

export default App;
