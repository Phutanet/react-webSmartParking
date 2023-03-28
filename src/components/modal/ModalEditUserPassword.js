import React, { useState, useEffect } from "react"
import './PopupModal.css'
import InputField from "../fields/InputField"
import axios from "axios"
import Swal from 'sweetalert2'


function ModalEditUserPassword({setOpenModal, userId}) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const isDisabled = !passwordMatch || (password === '' && confirmPassword === '');

    const handleSubmit = () => {
        const token = { accessToken: `${localStorage.getItem('accessToken')}` };
        const postData = {
            id: userId,
            newPassword: password
        };
        axios
            .post('/smartparking/profile/edit/password', postData, {headers: token})
            .then((res) => {
                Swal.fire({
                    title: 'เปลี่ยนรหัสผ่านสำเร็จ',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                .then(() => {
                    setOpenModal(false);
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
                    text: err.response.data.msg,
                    icon: 'error',
                    showConfirmButton: true,
                });
            });
    };

    // ตรวจสอบการ matching password
    useEffect(() => {
        setPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);
    
    
    return (
        <div id="modal-popup-background">
            <div className="modal-container">
                <div className="modal-close-btn">
                    <button onClick={() => setOpenModal(false)}>
                        <i className="fa-solid fa-square-xmark"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <h2>แก้ไขรหัสผ่าน</h2>
                </div>
                <div className="modal-body">
                    <InputField 
                        label="รหัสผ่าน" 
                        name="password" 
                        className="casual-field" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="รหัสผ่าน" 
                        errMessage="Password must be at least 8 characters long." 
                        required={true} 
                        pattern="^.{8,}$"
                    />
                    <InputField 
                        label="ยืนยันรหัสผ่าน" 
                        name="confirmPassword" 
                        className="casual-field" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="ยืนยันรหัสผ่าน" 
                        errMessage="Password don't match." 
                        required={true} 
                        pattern={password}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" id="cancel-btn" onClick={() => setOpenModal(false)}>ยกเลิก</button>
                    <button 
                        type="button" 
                        id={isDisabled ? "disabled-btn" : "submit-btn"}
                        disabled={isDisabled}
                        onClick={handleSubmit} 
                    >
                        แก้ไข
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditUserPassword