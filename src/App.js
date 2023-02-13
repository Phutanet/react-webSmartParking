import { Route, Routes } from 'react-router-dom'
import './App.css'

import NavbarExternal from './components/navbar/NavbarExternal'
import Carpark from './pages/external/Carpark'
import SearchCar from './pages/external/SearchCar'
import Contact from './pages/Contact/ContactPage'
import Login from './pages/external/Login'

import NavbarInternal from './components/navbar/NavbarInternal'
import CarparkCRUD from './pages/internal/CarparkCRUD'
import CCTV from './pages/internal/CCTV'
import MessageDealing from './pages/internal/MessageDealing'
import UserAccounts from './pages/internal/UserAccounts'
import Register from './pages/internal/Register'
import SystemSetting from './pages/internal/SystemSetting'
import Profile from './pages/internal/Profile'

import Footer from './components/footer/Footer'

import GPT from './pages/external/GPT'



function App() {
  const accessToken = localStorage.getItem('accessToken')
  if(!accessToken) {
    return (
      <>
      <NavbarExternal />
      <Routes>
        <Route path='/' element={<GPT />} />
        <Route path='/EXT/search-car' element={<SearchCar />} />
        <Route path='/EXT/contact' element={<Contact />} />
        <Route path='/EXT/login' element={<Login />} />
      </Routes>
      <Footer />
    </>
    );
  }
  
  return (
    <>
    <NavbarInternal />
    <Routes>
      <Route path='/INT/carpark-crud' element={<CarparkCRUD />} />
      <Route path='/INT/cctv' element={<CCTV />} />
      <Route path='/INT/message-dealing' element={<MessageDealing />} />
      <Route path='/INT/user-accounts' element={<UserAccounts />} />
      <Route path='/INT/register' element={<Register />} />
      <Route path='/INT/system-setting' element={<SystemSetting />} />
      <Route path='/INT/profile' element={<Profile />} />
    </Routes>
    <Footer />
    </>
  );

}

export default App;
