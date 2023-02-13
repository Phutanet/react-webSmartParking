import React, { useState } from 'react'
import './Register.css'
import InputField from '../../components/fields/InputField'
import Button from '../../components/button/Button'
import axios from 'axios'
import Swal from 'sweetalert2'



function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accountRole, setAccountRole] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [position, setPosition] = useState('')
  const [department, setDepartment] = useState('')
  const [company, setCompany] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const roles = [
    {
      id: 1,
      role: "admin"
    },
    {
      id: 2,
      role: "advance"
    },
    {
      id: 3,
      role: "basic"
    }
  ];


  const handleSubmit = (e) => {
    // e.preventDefault();

    const data = ({
      email: email,
      password: password,
      role: accountRole,
      firstname: firstName,
      lastname: lastName,
      employeeID: employeeId,
      position: position,
      department: department,
      company: company,
      phone: phoneNumber
    })

    const header = {
      'accessToken': `${localStorage.getItem('accessToken')}`
    }

    axios
    .post('/smartparking/auth/register', data, {headers: header})
    //สำหรับ Axios, ในกรณีที่ POST request ผ่าน โปรแกรมจะทำงานตาม condition ภายใน then
    .then(response => {
      if(response.status !== 201) {
        Swal.fire({
          title: 'ลงทะเบียนไม่สำเร็จ',
          text: response['message'],
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          title: 'ลงทะเบียนสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    //ในกรณีที่ request ไม่ผ่าน โปรแกรมจะทำงานตาม condition ภายใน catch
    .catch(err => {
      Swal.fire({
        title: 'ลงทะเบียนไม่สำเร็จ',
        // text: err.response['data']['msg'], กรณีที่ไม่กรอก หรือกรอกไม่ครบ แล้วกด submit (400)
        // text: err.response['data'], กรณีที่กรอก email ซ้ำ (409)
        text: err['message'],
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(err)
    })
  };

  return(
    <div className='root'>
      <div id='register-container-section-1'>
        <div className='form-container'>
          <div className='form-container-header'>
            <h2>สร้างบัญชีผู้ใช้</h2>
          </div>

          <div className='form-container-body'>
            <form>
                <InputField 
                label="อีเมล" 
                name="email" 
                className="normal-field"
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email" 
                disabled={false} 
                errMessage="Email must be formatted correctly."
                required={true}
                pattern="/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm"
                />
                <InputField 
                label="รหัสผ่าน" 
                name="password" 
                className="normal-field"
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
                disabled={false} 
                errMessage="Password must be at least 8 characters long."
                required={true}
                pattern="/^.{8,}$/"
                />

                <div className='normal-field'>
                  <label>ระดับบัญชี</label>
                  <select name='accountRole' defaultValue='DEFAULT' onChange={e => setAccountRole(e.target.value)}>
                    <option value='DEFAULT' id='selected-placeholder' disabled>Select An Options</option>
                    {roles.map((item,index) => 
                    <option key={index} value={item.role}>{item.role}</option>
                    )}
                  </select>
                </div>

                <InputField 
                label="ชื่อจริง" 
                name="firstName" 
                className="normal-field"
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                placeholder="First Name" 
                disabled={false} 
                errMessage="Name must not contain numbers or special characters."
                required={true}
                pattern="/^[a-zA-Z]+$/"
                />
                <InputField 
                label="นามสกุล" 
                name="lastName" 
                className="normal-field"
                type="text" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                placeholder="Last Name" 
                disabled={false} 
                errMessage="Surname must not contain numbers or special characters."
                required={true}
                pattern="^[a-zA-Z]+$"
                />
                <InputField 
                label="รหัสพนักงาน" 
                name="employeeId" 
                className="normal-field"
                type="text" 
                value={employeeId} 
                onChange={e => setEmployeeId(e.target.value)}
                placeholder="Employee ID" 
                disabled={false} 
                />
                <InputField 
                label="ตำแหน่งงาน" 
                name="position" 
                className="normal-field"
                type="text" 
                value={position} 
                onChange={e => setPosition(e.target.value)}
                placeholder="Position" 
                disabled={false} 
                />
                <InputField 
                label="แผนก/สังกัด" 
                name="department" 
                className="normal-field"
                type="text" 
                value={department} 
                onChange={e => setDepartment(e.target.value)}
                placeholder="Department" 
                disabled={false} 
                />
                <InputField 
                label="บริษัท" 
                name="company" 
                className="normal-field"
                type="text" 
                value={company} 
                onChange={e => setCompany(e.target.value)}
                placeholder="Company" 
                disabled={false} 
                />
                <InputField 
                label="เบอร์โทรศัพท์" 
                name="phoneNumber" 
                className="normal-field"
                type="text" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)} 
                placeholder="Phone Number" 
                disabled={false} 
                errMessage="Phone number can only contain numbers, spaces, and hyphens."
                required={true}
                pattern="/^[\d-\s]+$/"
                />
            </form>
          </div>

          <div className='form-container-footer'>
            <Button className='cancel-btn' label='ยกเลิก'/>
            <Button className='submit-btn' onClick={handleSubmit} label='สร้างบัญชี'/>
          </div>

        {/* end of form container */}
        </div>
      {/* end of container section 1 */}
      </div>
    {/* end of root */}
    </div>
  )
}

export default Register