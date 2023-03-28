import React, { useEffect, useRef, useState } from 'react'
import './SystemClosing.css'
import axios from 'axios'

function SystemClosing() {
  const firstRender = useRef(true);
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      axios
        .get('/smartparking/setting/system/status')
        .then((res) => {
          setSystemInfo(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, [])

  return (
    <div className="page-layout">
      <div id='sysclose-bg'>
        <div id='sysclose-content'>
          <img src='https://smart-park.ino.nectec.or.th/static/image/technical-support.png' 
            id='sysclose-image'
            alt='NECTEC-SmartParking Website Closing'
          />
          <strong>ปิดระบบชั่วคราว / System Closing.</strong>
          <p>Sorry for the inconvenience, we are currently undergoing maintenance. Please check back soon.</p>
          <p>ประกาศจากผู้ดูแล: <span>{systemInfo.msg}</span></p>
          <p>อัปเดตเมื่อ: <span>{systemInfo.update_at}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SystemClosing