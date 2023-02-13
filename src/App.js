import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './components/SideBar/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Discover from './Pages/Discover/Discover';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <div className='container-fluid movie-app'>
      <SideBar />
      <div className='container-fluid content-container'>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/discover' element={<Discover />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
