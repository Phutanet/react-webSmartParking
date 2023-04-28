import React from "react";
import { Route, Routes } from 'react-router-dom'
import './App.css'


import CheckTokenExpire from "./CheckTokenExpire"
import CheckSystemStatus from './CheckSystemStatus'
import SystemClose from "./pages/external/SystemClose"
import PageNotFound from "./pages/external/PageNotFound"
import NavigationBarExternal from './components/navbar/NavigationBarExternal'
import NavigationBarInternal from './components/navbar/NavigationBarInternal'
import Footer from './components/footer/Footer'


// EXTERNAL COMPONENTS
import Buildings from "./pages/external/Buildings"
import ParkingInfo from "./pages/external/ParkingInfo"
import SearchCar from "./pages/external/SearchCar"
import Contact from "./pages/external/Contact"
import Login from './pages/external/Login'

// INTERNAL COMPONENTS
import ManageBuildings from "./pages/internal/ManageBuildings"
import DeviceBuildings from "./pages/internal/DeviceBuildings"
import ManageDevices from "./pages/internal/ManageDevices"
import DeviceInfo from "./pages/internal/DeviceInfo"
import ContactMessage from "./pages/internal/ContactMessage"
import UserAccounts from "./pages/internal/UserAccounts"
import Register from "./pages/internal/Register"
import SystemSetting from "./pages/internal/SystemSetting"
import Profile from "./pages/internal/Profile"



function App() {
  const accessToken = localStorage.getItem('accessToken')
  
  return (
    <React.Fragment>
    {accessToken? (<NavigationBarInternal />) : (<NavigationBarExternal />)}

    <Routes>
      {/* public routes */}
      <Route path='*' element={<PageNotFound />} />
      <Route path='/' element={ accessToken ? <ManageBuildings /> : <Login /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/system-close' element={<SystemClose />} />

      <Route element={<CheckSystemStatus />}>
        <Route path='/buildings' element={<Buildings />} />
        <Route path='/parking-info' element={<ParkingInfo />} />
        <Route path='/search-car' element={<SearchCar />} />
        <Route path='/contact' element={<Contact />} />
      </Route>

      {/* we want to protect these routes */}
      <Route element={<CheckTokenExpire />}>
        <Route path='/internal/manage-buildings' element={<ManageBuildings />} />
        <Route path='/internal/device-buildings' element={<DeviceBuildings />} />
        <Route path='/internal/manage-devices' element={<ManageDevices />} />
        <Route path='/internal/device-info' element={<DeviceInfo />} />
        <Route path='/internal/contact-message' element={<ContactMessage />} />
        <Route path='/internal/user-accounts' element={<UserAccounts />} />
        <Route path='/internal/register' element={<Register />} />
        <Route path='/internal/system-setting' element={<SystemSetting />} />
        <Route path='/internal/profile' element={<Profile />} />
      </Route>
    </Routes>

    <Footer />
    </React.Fragment>
  );
}

export default App;