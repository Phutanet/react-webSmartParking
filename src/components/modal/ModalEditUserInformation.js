import React, { useState, useEffect, useRef } from "react"
import './PopupModal.css'
import InputField from '../fields/InputField'
import axios from "axios"
import Swal from 'sweetalert2'


const fetchRoles = async () => {
    const token = { accessToken: `${localStorage.getItem('accessToken')}` };
    try {
        const response = await axios.get("/smartparking/auth/roles", {headers: token});
        return (response.data.data);
    } catch (error) {
        console.log(error);
        return ([]);
    };
};

const fetchUserInformation = async () => {
    const token = { accessToken: `${localStorage.getItem('accessToken')}` };
    try {
        const response = await axios.get("/smartparking/profile/all", {headers: token});
        return (response.data.data);
    } catch (error) {
        console.log(error);
        return ([]);
    };
};

function ModalEditUserInformation({setOpenModal, userId, updateCredentials}) {
    const firstRender = useRef(true);
    const [rolesList, setRolesList] = useState([]);
    const [email, setEmail] = useState('');
    const [accountRole, setAccountRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [company, setCompany] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = () => {
        const token = { accessToken: `${localStorage.getItem('accessToken')}` };
        const data = {
            id: userId,
            role: accountRole,
            firstname: firstName,
            lastname: lastName,
            employeeID: employeeId,
            position: position,
            department: department,
            company: company,
            phone: phoneNumber
        };
        axios
            .post('/smartparking/profile/edit/profile', data, {headers: token})
            .then((res) => {
                updateCredentials(res.status);
                Swal.fire({
                    title: 'แก้ไขข้อมูลสำเร็จ',
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
                    title: 'แก้ไขข้อมูลไม่สำเร็จ',
                    text: err.response.data.msg,
                    icon: 'error',
                    showConfirmButton: true,
                })
            });
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            fetchRoles().then((result) => setRolesList(result));

            fetchUserInformation()
            .then((result) => {
                const profileList = result;
                const selectedProfile = profileList.find(profile => profile._id === userId);
                if (selectedProfile) {
                    setEmail(selectedProfile.email);
                    setAccountRole(selectedProfile.role);
                    setFirstName(selectedProfile.firstname);
                    setLastName(selectedProfile.lastname);
                    setEmployeeId(selectedProfile.employeeID);
                    setPosition(selectedProfile.position);
                    setDepartment(selectedProfile.department);
                    setCompany(selectedProfile.company);
                    setPhoneNumber(selectedProfile.phone);
                };
            });
        };
    }, [userId]);
    
    
    return (
        <div id="modal-popup-background">
            <div className="modal-container">
                <div className="modal-close-btn">
                    <button onClick={() => setOpenModal(false)}>
                        <i className="fa-solid fa-square-xmark"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <h2>แก้ไขข้อมูลบัญชีผู้ใช้</h2>
                </div>
                <div className="modal-body">
                    <InputField 
                        label="อีเมล" 
                        name="email" 
                        className="casual-field" 
                        type="email" 
                        value={email} 
                        placeholder="Email" 
                        disabled={true} 
                    />
                    <div className='casual-field'>
                        <label>ระดับบัญชี</label>
                        <select 
                            name='accountRole' 
                            defaultValue={accountRole} 
                            onChange={(e) => setAccountRole(e.target.value)} 
                        >
                            <option value={accountRole} disabled>{accountRole}</option>
                            {rolesList.map((role, index) =>
                                <option key={index} value={role.name}>{role.name}</option>
                            )}
                        </select>
                    </div>
                    <InputField 
                        label="ชื่อจริง" 
                        name="firstName" 
                        className="casual-field" 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        placeholder="First Name" 
                        errMessage="Name must be at least 1 characters long." 
                        required={true} 
                        pattern="^.{1,}$"
                    />
                    <InputField 
                        label="นามสกุล" 
                        name="lastName" 
                        className="casual-field" 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        placeholder="Last Name" 
                        errMessage="Surname must be at least 1 characters long." 
                        required={true} 
                        pattern="^.{1,}$"
                    />
                    <InputField 
                        label="รหัสพนักงาน" 
                        name="employeeId" 
                        className="casual-field"  
                        type="text" 
                        value={employeeId} 
                        onChange={(e) => setEmployeeId(e.target.value)} 
                        placeholder="Employee ID" 
                        errMessage="Please provide information." 
                        required={true} 
                        pattern="^.+$"
                    />
                    <InputField 
                        label="ตำแหน่งงาน" 
                        name="position" 
                        className="casual-field" 
                        type="text" 
                        value={position} 
                        onChange={(e) => setPosition(e.target.value)} 
                        placeholder="Position" 
                        errMessage="Please provide information." 
                        required={true} 
                        pattern="^.+$"
                    />
                    <InputField 
                        label="แผนก/สังกัด" 
                        name="department" 
                        className="casual-field" 
                        type="text" 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)} 
                        placeholder="Department" 
                        errMessage="Please provide information." 
                        required={true} 
                        pattern="^.+$"
                    />
                    <InputField 
                        label="บริษัท" 
                        name="company" 
                        className="casual-field" 
                        type="text" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        placeholder="Company" 
                        errMessage="Please provide information." 
                        required={true} 
                        pattern="^.+$"
                    />
                    <InputField 
                        label="เบอร์โทรศัพท์" 
                        name="phoneNumber" 
                        className="casual-field" 
                        type="text" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        placeholder="Phone Number" 
                        errMessage="Phone number can only contain numbers, spaces, and hyphens." 
                        required={true} 
                        pattern="^[0-9\s-]+$"
                    />

                </div>
                <div className="modal-footer">
                    <button type="button" onClick={() => setOpenModal(false)} id="cancel-btn">ยกเลิก</button>
                    <button type="button" onClick={handleSubmit} id="submit-btn">แก้ไข</button>
                </div>
            </div>
        </div>
  );
};

export default ModalEditUserInformation