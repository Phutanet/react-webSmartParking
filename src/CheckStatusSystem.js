import axios from 'axios';
import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'


const fetchStatus = async () => {
  const response = await axios('/smartparking/setting/system/status');
  const status = response.data.data.status;
  return status;
};

const CheckStatusSystem = () => {
  const firstRender = useRef(true);
  const [isValid, setIsValid] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      const getStatus = async () => {
        const status = await fetchStatus();
        validateStatus(status);
      };
      
      const validateStatus = (status) => {

        //กรณีที่สถานะระบบปิด และไม่มีตำแหน่ง
        if (status === false && role === null) {
          window.location.href = '/404/PageNotFound';
        }
        //กรณีสถานะระบบปิด และตำแหน่งไม่ใช่ admin
        else if (status === false && role !== "admin") {
          window.location.href = '/404/PageNotFound';
        }
        else  {
          setIsValid(true);
        }

      };
      getStatus();

    };
  }, [role]);

  return isValid ? <Outlet /> : null;

};

export default CheckStatusSystem;
