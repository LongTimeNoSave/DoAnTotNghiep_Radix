import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'

import { useEffect } from 'react';

// Component giúp tự động chuyển hướng trang
function AdminRedirect() {
  useEffect(() => {
    window.location.href = 'http://127.0.0.1:8000/admin';
  }, []);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        {/* Route chuyển hướng sang Django Admin */}
        <Route path="/admin" element={<AdminRedirect />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
