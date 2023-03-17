import React, { useState } from "react";
import "./Login.css";
import ImageSlider from '../../components/slider/ImageSlider';
import axios from "axios";
import Swal from 'sweetalert2';


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
            });
        } catch (err) {
            Swal.fire({
                title: 'เข้าสู่ระบบไม่สำเร็จ',
                text: err?.response?.data,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        };
    };

    return (
        <div className="page-layout">
            <div id="login-page-container">
                {/* section1 */}
                <div id="img-slide-layout">
                    <ImageSlider/>
                </div>
                {/* section2 */}
                <div id="auth-form-layout">
                    <div id='login-form-container'>
                        <h1>เข้าสู่ระบบ</h1>
                        <p>สำหรับเจ้าหน้าที่และบุคคลภายใน</p>

                        <form onSubmit={handleSubmit}>
                            <label>อีเมล</label>
                            <div className="login-input-field">
                                <i className="fa-solid fa-envelope"></i>
                                <input 
                                    type="email" 
                                    name="email"
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email} 
                                    placeholder="อีเมล / e-mail" 
                                />
                            </div>

                            <label>รหัสผ่าน</label>
                            <div className="login-input-field">
                                <i className="fa-solid fa-lock"></i>
                                <input 
                                    type="password" 
                                    name="password"
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                    placeholder="รหัสผ่าน / Password" 
                                />
                            </div>

                            <div className="btn-container">
                                <button className="login-btn" type="submit">เข้าสู่ระบบ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage