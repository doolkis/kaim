import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import ProjectsPage from './pages/ProjectsPage';
import MainPage from './pages/MainPage'; // ÚJ
import './index.css';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/main" element={<MainPage />} /> {/* ÚJ route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
