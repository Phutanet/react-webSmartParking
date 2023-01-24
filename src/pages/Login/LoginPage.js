import React, { useState } from "react";
import "./LoginPage.css"
import ImageSlider from '../../components/Slider/ImageSlider'


function LoginPage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    }

    return (
        // #1 container
        <div id="login-root">
            <div id="login-section-1">
                
                    <ImageSlider />
                
            </div>
            {/* #2 forms-container*/}
            <div id="login-section-2">
            {/* #3 signin-signup */}
                <div id="login-form-container">
                    <form id="login-form" onSubmit={handleSubmit}>
                        {/* <label className="topic-label" htmlFor="email">อีเมล</label> */}
                        <h2>เข้าสู่ระบบ</h2>
                        <span>สำหรับเจ้าหน้าที่ดูแลระบบ</span>
                        <div className="login-input-field">
                            <i className="fas fa-user"></i>
                            <input 
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
                            placeholder="อีเมล / Email" 
                            />
                        </div>
                                
                                    
                        {/* <label className="topic-label" htmlFor="password">รหัสผ่าน</label> */}
                        <div className="login-input-field">
                            <i className="fas fa-lock"></i>
                            <input 
                            type="password"
                            name="password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            placeholder="รหัสผ่าน / Password"
                            />
                        </div>
                        
                        <button className="login-button" type="submit">เข้าสู่ระบบ</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage