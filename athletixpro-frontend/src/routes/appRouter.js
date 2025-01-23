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
import AthleteMonitor from '../pages/AthleteMonitor';
import NewPage1 from '../pages/NewPage1';
import NewPage2 from '../pages/NewPage2';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/athlete/dashboard" element={<AthleteDashboard />} />
    <Route path="/coach/dashboard" element={<CoachDashboard />} />
    <Route path="/parent/dashboard" element={<ParentDashboard />} />
    <Route path="/athlete/monitor" element={<AthleteMonitor />} /> {/* Add AthleteMonitor route */}
    <Route path="/newpage1" element={<NewPage1 />} />
    <Route path="/newpage2" element={<NewPage2 />} />
  </Routes>
);

export default AppRouter;
