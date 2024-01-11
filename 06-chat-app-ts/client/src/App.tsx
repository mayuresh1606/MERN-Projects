import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/login"
import HomePage from "./pages/home"
import dotenv from "dotenv"
// dotenv.config();

function App() {
  
  const token = localStorage.getItem("token");

  console.log('token', token)
  return (
    <Router>
      <Routes>
        <Route 
        element={token ? <Navigate to="/" /> : <Login />}
        path='/login' />
        
        <Route 
        element={!token ? <Navigate to="/login" /> : <HomePage />}
        path='/' />
      </Routes>
    </Router>
  );
}

export default App;
