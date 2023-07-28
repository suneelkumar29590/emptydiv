import logo from './logo.svg';
import './App.css';
import Register from './client/registration';
import Success from './registrationsuccess';
import {Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginPage from './client/login';

import HomePage from './client/Home';
import Header from './client/Header';



function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route exact path = "/" element ={<Register/>}/>
        <Route exact path='/reg'  element={<Success/>}/>
        <Route exact path='/login'  element={<LoginPage/>}/>
        <Route exact path='/home'  element={<HomePage/>}/>
        <Route exact path='/header'  element={<Header/>}/>
      
       

         
      </Routes>
    </div>
  );
}

export default App;
