import { Routes, Route } from "react-router-dom"
import './App.css';
import { Login } from './components/Login';
import { Home } from './pages/Home';
import { Register } from "./components/Register";
import { Search } from "./components/Search";
import { UserHome } from "./pages/UserHome";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<UserHome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
