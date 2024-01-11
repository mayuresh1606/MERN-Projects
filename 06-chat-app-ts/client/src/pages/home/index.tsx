import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true })
  }
  return (
    <button className='button' onClick={logout}>Logout</button>
  )
}

export default HomePage