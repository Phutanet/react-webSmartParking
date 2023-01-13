import React, { useState } from 'react'
import { FiMenu, FiX} from "react-icons/fi";
import './Header.css'

function Header() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    console.log(click);
    const closeMobileMenu =() => setClick(false);

  return (
    <div className='header'>
        <div className='container'>
            <div className='header-con'>

                <div className='logo-container'>
                    <a href='#'>Smart Parking</a>
                </div>

                <ul className={click ? 'menu active' : 'menu'}>
                    <li className='menu-link'>
                        <a href='#'>ที่จอดรถ</a>
                    </li>
                    <li className='menu-link'>
                        <a href='#'>ค้นหารถ</a>
                    </li>
                    <li className='menu-link'>
                        <a href='#'>ติดต่อเจ้าหน้าที่</a>
                    </li>
                    <li className='menu-link'>
                        <a href='#'>เข้าสู่ระบบ/เจ้าหน้าที่</a>
                    </li>
                </ul>

                <div className='mobile-menu' onClick={handleClick}>
                    {click ? (
                        <FiX />
                    ) : (
                        <FiMenu />
                    )}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Header