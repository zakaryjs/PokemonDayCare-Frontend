import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AccountPortal from './pages/AccountPortal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ViewPokemon from './pages/Pokemon';
import CreatePokemon from './pages/CreatePokemon';
import ViewAppointments from './pages/Appointments';
import CreateAppointment from './pages/CreateAppointment';
import DateProvider from './contexts/DateProvider';
import UpdatePokemon from './pages/UpdatePokemon';
import UserProvider from './contexts/UserContext';
import NavBar from './components/NavBar';
import HeaderImage from './components/HeaderImage';
import BackgroundParticles from './components/BackgroundParticles';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <DateProvider>
    <UserProvider>
      <BrowserRouter>
          <HeaderImage />
          <NavBar />
          <BackgroundParticles />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/portal' element={<AccountPortal />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/pokemon' element={<ViewPokemon />} />
            <Route path='/createpokemon' element={<CreatePokemon />} />
            <Route path='/updatepokemon' element={<UpdatePokemon />} />
            <Route path='/appointments' element={<ViewAppointments />} />
            <Route path='/createappointment' element={<CreateAppointment />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </UserProvider>
  </DateProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();