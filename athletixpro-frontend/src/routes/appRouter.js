import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import AthleteDashboard from '../pages/athlete/Dashboard';
import CoachDashboard from '../pages/coach/Dashboard';
import ParentDashboard from '../pages/parent/Dashboard';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Add AdminDashboard route */}
    <Route path="/athlete/dashboard" element={<AthleteDashboard />} /> {/* Add AthleteDashboard route */}
    <Route path="/coach/dashboard" element={<CoachDashboard />} /> {/* Add CoachDashboard route */}
    <Route path="/parent/dashboard" element={<ParentDashboard />} /> {/* Add ParentDashboard route */}
  </Routes>
);

export default AppRouter;
