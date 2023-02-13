import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


function UserAccounts() {
  const firstRender = useRef(true)
  const [dataResponse, setDataResponse] = useState([])

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;

      const header = {
        'accessToken': `${localStorage.getItem('accessToken')}`
      }

      axios.get('/smartparking/profile/all', {headers: header})
      .then(res => {
        console.log(res)
        setDataResponse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }

  }, [])

  return (
    <div>UserAccounts hehehe</div>
  )
}

export default UserAccounts