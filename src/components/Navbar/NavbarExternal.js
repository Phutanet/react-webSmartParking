import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX} from 'react-icons/fi'
import './Navbar.css'



function Navbar2() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu =() => setClick(false);

  return (
        <nav className='navbar'>
            <div className='navbar-container container'>
                {/* logo */}
                <div className='navbar-logo' onClick={closeMobileMenu}>
                    <Link to='/'>Smart Parking</Link>
                </div>
                {/* hamburger icon */}
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FiX /> : <FiMenu />}
                </div>

                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <NavLink 
                            to='/'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        ที่จอดรถ
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/EXT/search-car'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        ค้นหารถ
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/EXT/contact'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        ติดต่อเจ้าหน้าที่
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink 
                            to='/EXT/login'
                            className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                            onClick={closeMobileMenu}
                        >
                        เข้าสู่ระบบ/เจ้าหน้าที่
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
  );
}

export default Navbar2;