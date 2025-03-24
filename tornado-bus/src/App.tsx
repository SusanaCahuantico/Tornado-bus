import './App.css'
import React from 'react';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <SearchForm />
        <Routes>
          <Route path="/" element={<SearchForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
