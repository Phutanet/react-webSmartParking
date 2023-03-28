import React from "react";
import { Route, Routes } from 'react-router-dom'
import './App.css'

import AuthProtectedComponent from './AuthProtectedComponent'
import CheckStatusSystem from './CheckStatusSystem'
import SystemClosing from "./pages/external/SystemClosing"
import NavigationBarExternal from './components/navbar/NavigationBarExternal'
import NavigationBarInternal from './components/navbar/NavigationBarInternal'
import Footer from './components/footer/Footer'

// EXTERNAL COMPONENTS
import ShowBuildingExternal from './pages/external/ShowBuildingExternal'
import ShowParking from './pages/external/ShowParking'
import SearchCar from "./pages/external/SearchCar";
import Contact from "./pages/external/Contact"
import Login from './pages/external/Login'

// INTERNAL COMPONENTS
import BuildingCRUD from './pages/internal/BuildingCRUD'
import PlacesForDevice from './pages/internal/PlacesForDevice'
import Devices from './pages/internal/Devices'
import DeviceInformation from './pages/internal/DeviceInformation'
import MessageDealing from "./pages/internal/MessageDealing";
import UserAccounts from "./pages/internal/UserAccounts"
import Register from "./pages/internal/Register"
import SystemSetting from "./pages/internal/SystemSetting"
import Profile from './pages/internal/Profile'



function App() {
  const accessToken = localStorage.getItem('accessToken')
  
  return (
    <React.Fragment>
    {accessToken? (<NavigationBarInternal />) : (<NavigationBarExternal />)}

    <Routes>
      {/* public routes */}
      <Route path='/EXT/login' element={<Login />} />
      <Route path='/404/PageNotFound' element={<SystemClosing />} />

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
    </React.Fragment>
  );
}

export default App;