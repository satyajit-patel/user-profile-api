import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import axios from "axios";
import { AuroraBackgroundDemo } from "./components/Landing/AuroraBackgroundDemo";

function App() {
  useEffect(() => {
    const wakeUpSidd = async () => {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/ping`);
      console.log(response.data);
    }
    wakeUpSidd();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/landing" element={<AuroraBackgroundDemo />} />
            <Route path="/" element={<Navigate to="/landing" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;