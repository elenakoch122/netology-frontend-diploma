import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from "./components/pages/HomePage/HomePage";
import OrderPage from "./components/pages/OrderPage/OrderPage";
import SuccessPage from "./components/pages/SuccessPage/SuccessPage";

export default function App() {
  return (
    <BrowserRouter className="App" basename={window.location.pathname || ''}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order/*" element={<OrderPage />} />
        <Route path="/success/*" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}