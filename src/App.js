import { Route, Routes } from 'react-router-dom'
import './App.css'

import AuthProtectedComponent from './AuthProtectedComponent'

import NavbarExternal from './components/navbar/NavbarExternal'
import ShowBuildingExternal from './pages/external/ShowBuildingExternal'
import ShowParking from './pages/external/ShowParking'
import SearchCar from './pages/external/SearchCar'
import Contact from './pages/Contact/ContactPage'
import Login from './pages/external/Login'

import NavbarInternal from './components/navbar/NavbarInternal'
import BuildingCRUD from './pages/internal/BuildingCRUD'
import PlacesForDevice from './pages/internal/PlacesForDevice'
import Devices from './pages/internal/Devices'
import DeviceInformation from './pages/internal/DeviceInformation'
import MessageDealing from './pages/internal/MessageDealing'
import UserAccounts from './pages/internal/UserAccounts'
import Register from './pages/internal/Register'
import SystemSetting from './pages/internal/SystemSetting'
import Profile from './pages/internal/Profile'

import Footer from './components/footer/Footer'

import CheckStatusSystem from './CheckStatusSystem'
import NotFound from './pages/external/NotFound'




function App() {
  const accessToken = localStorage.getItem('accessToken')
  
  return (
    <>
    {accessToken? (<NavbarInternal />) : (<NavbarExternal />)}

    <Routes>
      {/* public routes */}
      <Route path='/EXT/login' element={<Login />} />
      <Route path='/404/PageNotFound' element={<NotFound />} />

      <Route element={<CheckStatusSystem />}>
        <Route path='/' element={<ShowBuildingExternal />} />
        <Route path='/EXT/show-parking' element={<ShowParking />} />
        <Route path='/EXT/search-car' element={<SearchCar />} />
        <Route path='/EXT/contact' element={<Contact />} />
      </Route>

      {/* we want to protect these routes */}
      <Route element={<AuthProtectedComponent />}>
        <Route path='/INT/carpark-crud' element={<BuildingCRUD />} />
        <Route path='/INT/places-for-device' element={<PlacesForDevice />} />
        <Route path='/INT/devices' element={<Devices />} />
        <Route path='/INT/device-information' element={<DeviceInformation />} />
        <Route path='/INT/message-dealing' element={<MessageDealing />} />
        <Route path='/INT/user-accounts' element={<UserAccounts />} />
        <Route path='/INT/register' element={<Register />} />
        <Route path='/INT/system-setting' element={<SystemSetting />} />
        <Route path='/INT/profile' element={<Profile />} />
      </Route>
    </Routes>

    <Footer />
    </>
  );
}

export default App;