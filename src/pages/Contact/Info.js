import React from 'react'
import './Info.css'
import { ReactComponent as FacebookIcon } from '../../images/facebook-icon.svg';
import { ReactComponent as YoutubeIcon } from '../../images/youtube-icon.svg';
import { ReactComponent as TwitterIcon } from '../../images/twitter-icon.svg';
import NectecIcon from '../../images/nectec-icon.jpg';

function Info() {
  return (
    <div id='contact-section-2'>
        <div className='contact-title'>
            <h2>ช่องทางติดต่อ</h2>
        </div>

        <section className='info-container'>
            <div className='content-l'>
                <div className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-content">
                    <h5>ที่อยู่</h5>
                    <p>ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ <br/>
                      112 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง <br/>
                    จังหวัดปทุมธานี 12120
                    </p>
                </div>

                <div className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact-content">
                    <h5>โทรศัพท์</h5>
                    <p>02-564-6900</p>
                </div>

                <div className="contact-icon">
                    <i className="fa-solid fa-fax"></i>
                </div>
                <div className="contact-content">
                    <h5>โทรสาร</h5>
                    <p>02-564-6901-3</p>
                </div>

                <div className="contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact-content">
                    <h5>อีเมล</h5>
                    <p>info@nectec.or.th</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className='content-r'>
                <a className="social-link-button" href="https://www.facebook.com/NECTEC/">
                    <div className="social-icon">
                        {/* <i className="fa-brands fa-facebook"></i> */}
                        <FacebookIcon width="40px" />
                    </div>
                    <div className="social-label">
                        <p>NECTEC NSTDA</p>
                    </div>
                </a>
                <br />

                <a className="social-link-button" href="https://www.nectec.or.th/en/">
                    <div className="social-icon">
                        {/* <i className="fa-solid fa-earth-americas"></i> */}
                        <img src={NectecIcon} className="NectecIcon" alt=""/>
                    </div>
                    <div className="social-label">
                        <p>NECTEC : National Electronics and Computer Technology Center</p>
                    </div>
                </a>
                <br />

                <a className="social-link-button" href="https://www.youtube.com/@nectec">
                    <div className="social-icon">
                        {/* <i className="fa-brands fa-youtube"></i> */}
                        <YoutubeIcon width="40px" />
                    </div>
                    <div className="social-label">
                        <p>NECTEC</p>
                    </div>
                </a>
                <br/>

                <a className="social-link-button" href="https://twitter.com/nectec">
                    <div className="social-icon">
                        {/* <i className="fa-brands fa-twitter"></i> */}
                        <TwitterIcon width="40px" />
                    </div>
                    <div className="social-label">
                        <p>@NECTEC</p>
                    </div>
                </a>
                <br/>


            </div>
        </section>
    </div>
  )
}

export default Info