import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Compo/Home'
import React from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import AdminLogin from './Compo/Login'
import AdminDashboard from './Compo/Dashboard'
export const backend_url = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/login' element={<AdminLogin/>}/> 
      <Route path="/dashboard" element={<AdminDashboard />} />

    </Routes>
    </>
  )
}

export default App
