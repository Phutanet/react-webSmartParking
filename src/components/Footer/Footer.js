import React from 'react';
import './Footer.css';

function Footer() {
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
                    <p>Dolore tempor labore est no et lorem diam et lorem. Stet at magna at clita lorem invidunt kasd et invidunt. Justo rebum ea eirmod at invidunt magna, lorem accusam amet sit nonumy at. Et dolores consetetur sed sadipscing ipsum rebum..</p>
                </div>

                <div className='footer-content-body-right f-content-box'>
                    <div className='footer-content-body-topic'>ติดต่อเรา</div>
                    <div className='footer-content-phone'>
                        <a href='#!'><i className="fa-solid fa-phone-volume"></i>02-564-6900</a>
                    </div>
                    <div className='footer-content-fax'>
                        <a href='#!'><i className="fa-solid fa-fax"></i>02-564-6901-3</a>
                    </div>
                    <div className='footer-content-email'>
                        <a href='#!'><i className="fa-solid fa-envelope"></i>info@nectec.or.th</a>
                    </div>
                    <div className='footer-content-location'>
                        <a href='#!'>
                            <i className="fa-solid fa-location-dot"></i>
                            ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ <br/>
                            112 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง <br/>
                            จังหวัดปทุมธานี 12120
                        </a>
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
                <a href="#!">Privacy policy</a>
                <a href="#!">Terms & condition</a>
                </span>
            </div>
        </div>
  </footer>
  );
};

export default Footer