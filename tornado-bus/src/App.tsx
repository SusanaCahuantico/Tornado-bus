import './App.css'
import React from 'react';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import TripList from './components/TripList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <SearchForm />
      </div>
      <TripList/>
    </div>
  );
};

export default App;
