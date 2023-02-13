import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import ImageSlider from '../../components/slider/ImageSlider';
import Swal from 'sweetalert2'


async function loginUser(credentials) {
    return await axios
    .post ("/smartparking/auth/login", credentials)
    .then(function (response) {
        return (response['data'])
    })
    //สำหรับ Axios, ในกรณีที่ POST request ไม่ผ่าน(error) จะทำตาม condition ใน catch
    .catch(err => {
        Swal.fire({
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: err.response['data'],
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
        console.log(err)
    })
}

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser ({
            email,
            password
        });

        if (response['accessToken'] != null) {
            Swal.fire({
                title: 'เข้าสู่ระบบสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                localStorage.setItem('accessToken', response['accessToken']);
                window.location.href = '/INT/carpark-crud';
            })
        }
    };


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