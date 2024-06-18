

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Where you are importing Register
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/chat';


function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat/>} />

      </Routes>
    </BrowserRouter>

    
  
  );
}

export default App;
