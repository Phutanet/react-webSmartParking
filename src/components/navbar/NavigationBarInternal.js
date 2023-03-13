import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './NavigationBar.css'

function NavigationBarInternal() {
    const [left, setLeft] = useState('-100%');

    const toggleMenu = () => {
        if (left === '-100%') {
          setLeft('0');
        } else {
          setLeft('-100%');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("email")
        window.location.href = "/EXT/login"
    };

  return (
    <nav>
        <div className='navbar'>
            {/* hamburger icon */}
            <i className="fa-solid fa-bars hamburger-icon" onClick={toggleMenu}></i>
            {/* logo */}
            <div className='nav-logo-container'>
                <Link to='/INT/carpark-crud' className='nav-logo-text'>Smart Parking</Link>
            </div>
            
            <div className='nav-menu-container' style={{ left }}>
                {/* side bar header and x-mark */}
                <div className='slidebar-logo-container'>
                    <span className='slidebar-logo-text'>Smart Parking</span>
                    <i className="fa-solid fa-x xmark-icon" onClick={toggleMenu}></i>
                </div>

                <ul className='nav-item-ul'>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/INT/carpark-crud' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            ที่จอดรถ
                        </NavLink>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/INT/places-for-device' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            CCTV
                        </NavLink>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/INT/message-dealing' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive || 
                            ['/INT/message-dealing', 
                            '/INT/user-accounts', 
                            '/INT/register', 
                            '/INT/system-setting']
                            .includes(window.location.pathname) ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            จัดการระบบ
                        </NavLink>
                        <i className="fa-solid fa-chevron-down sub-menu-arrow"></i>
                        <ul className='nav-sub-item-ul'>
                            <li className='nav-item-li'>
                                <NavLink 
                                to='/INT/message-dealing' 
                                className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                                onClick={toggleMenu}
                                >ข้อความติดต่อ</NavLink>
                            </li>
                            <li className='nav-item-li'>
                                <NavLink 
                                to='/INT/user-accounts'
                                className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                                onClick={toggleMenu}
                                >ผู้ใช้งาน</NavLink>
                            </li>
                            <li className='nav-item-li'>
                                <NavLink 
                                to='/INT/register' 
                                className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                                onClick={toggleMenu}
                                >สร้างบัญชีผู้ใช้</NavLink>
                            </li>
                            <li className='nav-item-li'>
                                <NavLink 
                                to='/INT/system-setting'
                                className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                                onClick={toggleMenu}
                                >ตั้งค่าระบบ</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/INT/profile' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            บัญชีผู้ใช้
                        </NavLink>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/EXT/login' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={() => {toggleMenu(); handleLogout();}}
                        >
                            ออกจากระบบ
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>  
  );
};

export default NavigationBarInternal