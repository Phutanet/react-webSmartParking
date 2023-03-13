import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './NavigationBar.css'

function NavigationBarExternal() {
    const [left, setLeft] = useState('-100%');
    
    const toggleMenu = () => {
        if (left === '-100%') {
          setLeft('0');
        } else {
          setLeft('-100%');
        }
    };

  return (
    <nav>
        <div className='navbar'>
            {/* hamburger icon */}
            <i className="fa-solid fa-bars hamburger-icon" onClick={toggleMenu}></i>
            {/* logo */}
            <div className='nav-logo-container'>
                <Link to='/' className='nav-logo-text'>Smart Parking</Link>
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
                        to='/' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu} 
                        >
                            ที่จอดรถ
                        </NavLink>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/EXT/search-car' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            ค้นหารถ
                        </NavLink>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/EXT/contact' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            ติดต่อเจ้าหน้าที่
                        </NavLink>
                    </li>
                    <li className='nav-item-li'>
                        <NavLink 
                        to='/EXT/login' 
                        className={({ isActive }) => "nav-item-li-a" + (isActive ? " activated" : "")} 
                        onClick={toggleMenu}
                        >
                            เข้าสู่ระบบ/เจ้าหน้าที่
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
};

export default NavigationBarExternal