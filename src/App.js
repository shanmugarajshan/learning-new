import React, { useState } from 'react';
import Login from './Login';
import { Route, Router, Routes } from 'react-router-dom';
import DashBoard from './DashBoard';

function App() {


  return (
    <div>
      <Routes>
      <Route path='/' element= {<Login />}/>
      <Route path='/dashBoard' element= {<DashBoard />}/>
      </Routes>

    </div>
  );
}

export default App;
