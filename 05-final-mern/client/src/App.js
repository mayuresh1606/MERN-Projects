import { useEffect, useState } from 'react';
// import { useNavigate, Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { Routes, Route, useNavigate} from "react-router-dom"
import './App.css';
import axios from "axios"

function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("http://localhost:5000/post/", {
        headers:{
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNocnV0aTA3MTEiLCJpYXQiOjE2ODkzNTIxODB9.YlIp5WR9oqSHTJ9b3aYUZlZN8Jcxy48Fz9n_mugukFo"
        }
      })
      console.log(data)
    }
    if (token) fetchPosts()
    else navigate("/login", {replace: true});
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' >  Home Page  </Route>
        <Route path='/login'> Login Page  </Route>
      </Routes>
    </div>
  );
}

export default App;
