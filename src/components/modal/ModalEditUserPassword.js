import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../fields/InputField";
import Button from "../button/Button";
import "./ModalAddCarpark.css";
import Swal from 'sweetalert2';


function ModalEditUserPassword({setOpenModal, userId}) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);


    useEffect(() => {
      setPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const isDisabled = !passwordMatch || (password === '' && confirmPassword === '');

    const handleSubmit = (e) => {
      const token = {
        'accessToken': `${localStorage.getItem('accessToken')}`
      }
      const postData = ({
        id:userId,
        newPassword:password,
      });

      axios
        .post('/smartparking/profile/edit/password', postData, {headers: token})
        .then(() => {
          Swal.fire({
            title: 'เปลี่ยนรหัสผ่านสำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          .then(() => {
            setOpenModal(false);
          })
        })
        .catch((err) => {
          Swal.fire({
            title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
            text: err.response.data.msg,
            icon: 'error',
            showConfirmButton: true,
          })
        });
    };


    return (
        <div className='modal-background'>
          <div className="modal-container">
            <div className="title-close-btn">
              <button onClick={() => {setOpenModal(false);}}>
                <i className="fa-solid fa-square-xmark"></i>
              </button>
            </div>
            
            <div className="modal-title">
                <h2>แก้ไขรหัสผ่าน</h2>
            </div>
  
            <div className="modal-body">
              <form>
                <InputField 
                label="รหัสผ่าน" 
                name="password" 
                className="normal-field" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="รหัสผ่าน" 
                errMessage="Password must be at least 8 characters long." 
                required={true} 
                pattern="^.{8,}$"
                />

                <InputField 
                label="ยืนยันรหัสผ่าน" 
                name="confirmPassword" 
                className="normal-field" 
                type="password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder="ยืนยันรหัสผ่าน" 
                errMessage="Password don't match." 
                required={true} 
                pattern={password}
                />
              </form>
            </div>
  
            <div className="modal-footer">
              <Button 
              className='cancel-btn' 
              onClick={() => {setOpenModal(false);}} 
              label='ยกเลิก'
              />

              <Button 
              className={isDisabled ? 'disabled-btn' : 'submit-btn'} 
              disabled={isDisabled} 
              onClick={handleSubmit} 
              label='แก้ไข' 
              />
            </div>
          </div>
        </div>
    );
};

export default ModalEditUserPassword