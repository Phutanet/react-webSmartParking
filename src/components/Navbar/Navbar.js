import React, { useState } from 'react'
import { FiMenu, FiX} from "react-icons/fi";
import './Navbar.css'



function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    //console.log(click);
    const closeMobileMenu =() => setClick(false);

  return (
        <div id='nav-root'>
            <div id='nav-container'>
                <div id='header-container'>

                    <div className='logo-container'>
                        <a href='/'>Smart Parking</a>
                    </div>


                    <ul className={click ? 'menu active' : 'menu'}>
                        <li className='menu-link' onClick={closeMobileMenu}>
                            <a href='/'>ที่จอดรถ</a>
                        </li>
                        <li className='menu-link' onClick={closeMobileMenu}>
                            <a href='/search'>ค้นหารถ</a>
                        </li>
                        <li className='menu-link' onClick={closeMobileMenu}>
                            <a href='/contact'>ติดต่อเจ้าหน้าที่</a>
                        </li>
                        <li className='menu-link' onClick={closeMobileMenu}>
                            <a href='/login'>เข้าสู่ระบบ/เจ้าหน้าที่</a>
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

export default Navbar