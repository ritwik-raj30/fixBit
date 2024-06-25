import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Where you are importing Register
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/chat";
import SubmitComplaint from "./pages/submit";
import GetComplains from "./pages/complains";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/submit" element={<SubmitComplaint />} />
        <Route path="/complains" element={<GetComplains />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
