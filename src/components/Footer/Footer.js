import React from 'react';
import './Footer.css';

function Footer() {
    const handleAnchorClick = (e) => {
        e.preventDefault();
    };

  return (
    <footer>
        <div className="footer-content">
            <div className="footer-content-header">
                <div className="footer-header-logo">
                    <span>Smart Parking</span>
                </div>
                <div className="media-icons">
                <a href="https://www.facebook.com/NECTEC/"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/nectec"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/@nectec"><i className="fab fa-youtube"></i></a>
                <a href="https://www.nectec.or.th/en/"><i className="fa fa-globe"></i></a>
                </div>
            </div>

            <div className="footer-content-body">
                <div className='footer-content-body-left f-content-box'>
                    <div className='footer-content-body-topic'>เกี่ยวกับเรา</div>
                    <p>
                        โครงการระบบแสดงที่จอดรถยนต์อัจฉริยะคือโครงการพัฒนาซอฟต์แวร์ช่วยเหลือผู้ขับขี่รถยนต์โดยการบอกจำนวนที่จอดรถยนต์ภายในสถานที่หรืออาคารจอดรถยนต์ด้วยข้อมูลที่เก็บจากกล้องวงจรปิดที่ติดตั้งไว้ภายในสถานที่หรืออาคารจอดรถยนต์
                    </p>
                </div>

                <div className='footer-content-body-right f-content-box'>
                    <div className='footer-content-body-topic'>ติดต่อเรา</div>
                    <div className='footer-content-phone'>
                        <p><i className="fa-solid fa-phone-volume"></i>02-564-6900</p>
                    </div>
                    <div className='footer-content-fax'>
                        <p><i className="fa-solid fa-fax"></i>02-564-6901-3</p>
                    </div>
                    <div className='footer-content-email'>
                        <p><i className="fa-solid fa-envelope"></i>info@nectec.or.th</p>
                    </div>
                    <div className='footer-content-location'>
                        <p>
                            <i className="fa-solid fa-location-dot"></i>
                            ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ <br/>
                            112 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง <br/>
                            จังหวัดปทุมธานี 12120
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="footer-copyright">
            <div className="footer-copyright-body">
                <span>
                    Copyright © 2023&nbsp;
                    <a href="https://www.nectec.or.th/en/">
                        National Electronics and Computer Technology Center.
                    </a>All rights reserved
                </span>
                <span>
                <a href="#!" onClick={handleAnchorClick}>Privacy policy</a>
                <a href="#!" onClick={handleAnchorClick}>Terms & condition</a>
                </span>
            </div>
        </div>
  </footer>
  );
};

export default Footer