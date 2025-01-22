import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminProfile from '../pages/admin/Profile'; // Updated import path
import AthleteProfile from '../pages/athlete/Profile'; // Updated import path
import CoachProfile from '../pages/coach/Profile'; // Updated import path
import ParentProfile from '../pages/parent/Profile'; // Updated import path

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/admin-profile" element={<AdminProfile />} />
    <Route path="/athlete-profile" element={<AthleteProfile />} />
    <Route path="/coach-profile" element={<CoachProfile />} />
    <Route path="/parent-profile" element={<ParentProfile />} />
  </Routes>
);

export default AppRouter;
