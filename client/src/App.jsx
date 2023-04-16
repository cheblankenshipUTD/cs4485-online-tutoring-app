import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Tutors from './components/Tutors';
import Subjects from './components/Courses';
import Appointments from './components/Appointments';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Logout from './components/Logout';
import TutorsNew from './components/TutorsNew';
import Profile from './components/Profile';
import History from './components/History';
import Settings from './components/Settings';
import AppointmentsNew from './components/AppointmentsNew';
import UsersNew from './components/UsersNew';
import Welcome from './components/Welcome';

import ProtectedRoutes from './services/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/login' element={<Login />} />  
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tutors' element={<Tutors />} />
        <Route path='/courses' element={<Subjects />} />
        <Route path='/tutors/new' element={<TutorsNew />} />
        <Route path='/users/new' element={<UsersNew />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/reservations" element={<Appointments />} />
          <Route path="/reservations/new" element={<AppointmentsNew />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/history' element={<History />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/favorites/:userID' element={<Settings />} />
          <Route path='/favorites/add/:userID/:tutorID' element={<Settings />} />
          <Route path='//favorites/delete/:userID/:tutorID' element={<Settings />} />
          <Route path='/reservations/:id' element={<Settings />} />
        </Route>   
      </Routes> 
      <Footer />
    </BrowserRouter>
  )
}

export default App
