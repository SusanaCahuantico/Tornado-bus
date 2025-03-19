import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';

const Home: React.FC = () => (
  <div className='bg-gray-100'>
    <Navbar />
    <SearchForm />
  </div>
);

export default Home;