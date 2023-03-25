import React, {useState, useEffect, useRef} from 'react';
import './SystemSetting.css';
import axios from 'axios';
import Swal from 'sweetalert2';


function SystemSetting() {
    const firstRender = useRef(true);
    const [selected, setSelected] = useState(null);
    const [entries, setEntries] = useState([]);
    const [configName, setConfigName] = useState('');
    const [status, setStatus] = useState(null);
    const [announceMsg, setAnnounceMsg] = useState('');

    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null);
        } else {
            return setSelected(index);
        }
    };

    // เนื่องจาก <select> คืนค่าเป็น String เสมอจึงต้องแปลงค่าเป็น boolean
    const convertValType = (e) => {
        const value = e.target.value === "true";
        setStatus(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = { accessToken: `${localStorage.getItem("accessToken")}` };
        const data = ({
            name: configName,
            status: status,
            msg: announceMsg
        });
        if (announceMsg === "" || announceMsg === null) {
            Swal.fire({
                title: 'ตั้งค่าไม่สำเร็จ',
                text: 'กรุณาตั้งค่า ข้อความประกาศ (Announcements) ใหม่อีกครั้ง',
                icon: 'error',
                showConfirmButton: true
            })
        } else {
            axios
                .post('/smartparking/setting/system/post/windows/display', data, {headers: token})
                .then((res) => {
                    Swal.fire({
                        title: 'ตั้งค่าสำเร็จ',
                        text: res.data.msg,
                        icon: 'success',
                        showConfirmButton: true
                    })
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'ตั้งค่าไม่สำเร็จ',
                        text: err.data.msg,
                        icon: 'error',
                        showConfirmButton: true
                    })
                    console.log(err);
                });
        };
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = { accessToken: `${localStorage.getItem("accessToken")}` };
            axios
                .get("/smartparking/setting/system/get_all", { headers: token })
                .then((res) => {
                    setEntries(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);


  return (
    <div className='page-layout'>
        <div id='sysmanage-bg'>
            <div id='sysmanage-content'>
                <div className='title'>
                    <strong>ตั้งค่าระบบ / System Settings</strong>
                </div>
                <div className='accordion-group'>
                    {entries.map((entry, index) => (
                        <div key={index} className='accordion'>
                            {/* เมื่อกดที่กล่องรายการจะกำหนดค่าของตัวแปร useState ทันที 
                            เพื่อป้องกันกรณีที่ผู้ใช้งานกดปุ่มตั้งค่าโดยที่ยังไม่ได้ปรับแต่งใดๆเพิ่ม  */}
                            <div 
                                className='accordion-head' 
                                onClick={() => {
                                    setConfigName(entry.name); 
                                    setStatus(entry.status);
                                    setAnnounceMsg(entry.msg);
                                    toggle(index);
                                }}
                            >
                                <label>
                                    {entry.name}
                                </label>
                                <span>
                                    {selected === index ?
                                        <i className="fa-solid fa-chevron-down"></i>
                                        : <i className="fa-solid fa-chevron-right"></i>
                                    }
                                </span>
                            </div>
                            {/* select จะแสดง option ที่มีค่า value เท่ากับ `entry.status` เมื่อ render */}
                            <div className={selected === index ? "accordion-body active" : "accordion-body"}>
                                <form onSubmit={handleSubmit}>
                                    <select 
                                        name='status'
                                        defaultValue={entry.status}
                                        onChange={convertValType}
                                    >
                                        <option value="true">เปิดระบบ/True</option>
                                        <option value="false">ปิดระบบ/False</option>
                                    </select>
                                    <textarea 
                                        rows={6}
                                        type="text"
                                        name='announceMsg'
                                        onChange={(e) => setAnnounceMsg(e.target.value)}
                                        value={announceMsg}
                                        placeholder="ข้อความประกาศ/Announcements"
                                    />
                                    <div className='btn-container'>
                                        <button type='submit' className='submit-btn'>ตั้งค่า/Apply</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default SystemSetting