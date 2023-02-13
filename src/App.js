import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './components/SideBar/Sidebar';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Discover from './Pages/Discover/Discover';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <div className='container-fluid movie-app'>
      <SideBar />
      <div className='container-fluid content-container'>
        <div>
          <HashRouter>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/discover' element={<Discover />} />
              <Route path='/' exact element={<Home />} />
            </Routes>
          </HashRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
