import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function Profile() {
  const firstRender = useRef(true)
  const [dataResponse, setDataResponse] = useState(null)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [accountRole, setAccountRole] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [createAt, setCreateAt] = useState('');
  const [latestUpdate, setLatestUpdate] = useState('');


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      const header = {
        'accessToken': `${localStorage.getItem('accessToken')}`
      }

      axios
      .get('/smartparking/profile/me', {headers: header})
      .then(res => {
        setDataResponse(res.data)
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])

  //เมื่อ dataResponse มีการเปลี่ยนแปลงค่า -> ทำการ set ค่าให้ props
  useEffect(() => {
    if (dataResponse) {
      setFirstName(dataResponse.data['firstname']);
      setLastName(dataResponse.data['lastname']);
      setEmail(dataResponse.data['email']);
      setEmployeeId(dataResponse.data['employeeID']);
      setAccountRole(dataResponse.data['role']);
      setPosition(dataResponse.data['position']);
      setDepartment(dataResponse.data['department']);
      setCompany(dataResponse.data['company']);
      setPhone(dataResponse.data['phone']);
      setId(dataResponse.data['_id']);
      setCreateAt(dataResponse.data['create_at']);
      setLatestUpdate(dataResponse.data['update_latest']);
    }
  }, [dataResponse]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>First name: {firstName}</p>
      <p>Last name: {lastName}</p>
      <p>Email: {email}</p>
      <p>EmployeeID: {employeeId}</p>
      <p>Account role: {accountRole}</p>
      <p>Position: {position}</p>
      <p>Department: {department}</p>
      <p>Company: {company}</p>
      <p>Phone: {phone}</p>
      <p>ID: {id}</p>
      <p>Create at: {createAt}</p>
      <p>Latest update: {latestUpdate}</p>
    </div>
  )
}

export default Profile