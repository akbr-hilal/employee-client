import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AddData from './pages/AddData';
import DetailData from './pages/DetailData';
import EditData from './pages/EditData';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/add-data" element={<AddData />} />
      <Route path="/employee/:id" element={<DetailData />} />
      <Route path="/edit-employee/:id" element={<EditData />} />
    </Routes>
  );
}

export default App;
