import React, { useState } from "react";
import ImageSlider from '../../components/slider/ImageSlider';
import axios from "axios";
import Swal from 'sweetalert2';
import "./Login.css";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/smartparking/auth/login", 
                JSON.stringify({ email:email, password:password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            Swal.fire({
                title: 'เข้าสู่ระบบสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                const accessToken = response?.data?.accessToken;
                localStorage.setItem('accessToken', accessToken);

                const role = response?.data?.role;
                localStorage.setItem('role', role);

                window.location.href = '/INT/carpark-crud';
            })
        } catch (err) {
            Swal.fire({
                title: 'เข้าสู่ระบบไม่สำเร็จ',
                text: err?.response?.data,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    return (
        <div id="login-root">
            <div id="login-section-1">
                <ImageSlider />
            </div>

            <div id="login-section-2">
                <div id="login-form-container">
                    <form id="login-form" method="post" onSubmit={handleSubmit}>
                        <h2>เข้าสู่ระบบ</h2>
                        <span>สำหรับเจ้าหน้าที่ดูแลระบบ</span>
                        <div className="login-input-field">
                            <i className="fas fa-user"></i>
                            <input 
                            type="email"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email} 
                            placeholder="อีเมล / Email" 
                            autoComplete="off"
                            />
                        </div>
                                
                                    
                        <div className="login-input-field">
                            <i className="fas fa-lock"></i>
                            <input 
                            type="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
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