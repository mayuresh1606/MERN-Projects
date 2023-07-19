import { Routes, Route } from "react-router-dom"
import './App.css';
import { Login } from './components/Login';
import { Home } from './pages/Home';
import { Register } from "./components/Register";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
