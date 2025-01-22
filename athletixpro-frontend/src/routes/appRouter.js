import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminProfile from '../pages/AdminProfile';
import AthleteProfile from '../pages/AthleteProfile';
import CoachProfile from '../pages/CoachProfile';
import ParentProfile from '../pages/ParentProfile';

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
