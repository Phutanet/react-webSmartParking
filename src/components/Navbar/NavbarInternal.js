import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX} from 'react-icons/fi'
import './Navbar.css'



function NavbarInternal() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu =() => setClick(false)

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("email")
        window.location.href = "/EXT/login"
    };

  return (
        <nav className='navbar'>
            <div className='navbar-container container'>
                {/* logo */}
                <div className='navbar-logo' onClick={closeMobileMenu}>
                    <Link to='/INT/carpark-crud'>Smart Parking</Link>
                </div>
                {/* hamburger icon */}
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FiX /> : <FiMenu />}
                </div>

                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <NavLink 
                            to='/INT/carpark-crud'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        ที่จอดรถ
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/INT/places-for-device'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        CCTV
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/INT/message-dealing'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        จัดการระบบ
                        </NavLink>
                        <ul>
                            <li>
                                <NavLink
                                to='/INT/message-dealing'
                                className={({ isActive }) => "sub-nav-links" + (isActive ? " activated" : "")}
                                >
                                    ข้อความติดต่อ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to='/INT/user-accounts'
                                className={({ isActive }) => "sub-nav-links" + (isActive ? " activated" : "")}
                                >
                                    ผู้ใช้งาน
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to='/INT/register'
                                className={({ isActive }) => "sub-nav-links" + (isActive ? " activated" : "")}
                                >
                                    สร้างบัญชีผู้ใช้
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                to='/INT/system-setting'
                                className={({ isActive }) => "sub-nav-links" + (isActive ? " activated" : "")}
                                >
                                    ตั้งค่าระบบ
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/INT/profile'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        บัญชีผู้ใช้
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/EXT/login'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={() => {closeMobileMenu(); handleLogout();}}
                        >
                        ออกจากระบบ
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
  );
}

export default NavbarInternal;