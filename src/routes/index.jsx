import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GenarateQr from '../pages/GenarateQr';
import ScanQr from '../pages/ScanQr';
import Login from "../pages/Login";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/generate-qr" element={<GenarateQr />} />
    <Route path="/scan-qr" element={<ScanQr />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
