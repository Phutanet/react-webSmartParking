import React, { useState, useEffect, useRef, useCallback } from "react"
import './PopupModal.css'
import InputField from "../fields/InputField"
import axios from "axios"
import Swal from 'sweetalert2'


function ModalAddDevice({setOpenModal, buildingID, setDevice}) {
    const firstRender = useRef(true);
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [deviceImage, setDeviceImage] = useState('');
    const [floorIndex, setFloorIndex] = useState('');
    const [sensor, setSensor] = useState('');
    const [resolution, setResolution] = useState('');
    const [frameRate, setFrameRate] = useState('');
    const [dayNight, setDayNight] = useState('');
    const [lens, setLens] = useState('');

    const handleChange = useCallback((event) => {
        const selected = deviceList.find((device) => device.deviceID === event.target.value);
        setDeviceId(selected.deviceID);
        setDeviceName(selected.deviceName);
        setDeviceImage(selected.image);
        setFloorIndex(selected.floorIndex);

        (selected.detail).map((property) => {
            if (property.name === "sensor") {
                return setSensor(property.value);
            } else if (property.name === "resolution") {
                return setResolution(property.value);
            } else if (property.name === "frame_rate") {
                return setFrameRate(property.value);
            } else if (property.name === "day/night") {
                return setDayNight(property.value);
            } else {
                return setLens(property.value);
            }
        })

    }, [deviceList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = { accessToken: `${localStorage.getItem('accessToken')}` };
        const postData = {
            buildingID: buildingID,
            floorIndex: floorIndex,
            deviceID: deviceId,
            status: true
        };
        const newDevice = {
            floorIndex: floorIndex,
            deviceID: deviceId,
            deviceName: deviceName,
            image: deviceImage
        };

        axios
            .post('/smartparking/api/gateway/display/device', postData, {headers: token})
            .then((res) => {
                Swal.fire({
                    title: 'เพิ่มอุปกรณ์สำเร็จ',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setDevice(newDevice);
                    setOpenModal(false);
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'ล้มเหลว',
                    text: err.msg,
                    icon: 'error',
                    showConfirmButton: true
                });
            });
    };
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = { accessToken: `${localStorage.getItem('accessToken')}` };
            const postData = { buildingID: buildingID }
            axios
                .post('/smartparking/api/info/building/detail', postData, {headers: token})
                .then((res) => {
                    setDeviceList(res.data.data.devices);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [buildingID]);
    


    return (
        <div id="modal-popup-background">
            <div className="modal-container">
                <div className="modal-close-btn">
                    <button onClick={() => setOpenModal(false)}>
                        <i className="fa-solid fa-square-xmark"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <h2>เพิ่มอุปกรณ์กล้อง CCTV</h2>
                </div>
                <div className="modal-body">
                    <div className="casual-field">
                        <label>ชื่อกล้อง</label>
                        <select 
                            name="deviceName" 
                            defaultValue="DEFAULT" 
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled>เลือกกล้อง</option>
                            {deviceList.map((device, index) => {
                                if (device.display === false) {
                                    return(
                                        <option key={index} value={device.deviceID}>{device.deviceName}</option>
                                    );
                                };
                                return(null);
                            })}
                        </select>
                    </div>
                    <InputField 
                        label="Sensor" 
                        name="sensor" 
                        className="casual-field" 
                        type="text" 
                        value={sensor} 
                        placeholder="กรุณาเลือกอุปกรณ์" 
                        disabled={true}
                    />
                    <InputField 
                        label="Resolution" 
                        name="resolution" 
                        className="casual-field" 
                        type="text" 
                        value={resolution} 
                        placeholder="กรุณาเลือกอุปกรณ์" 
                        disabled={true}
                    />
                    <InputField 
                        label="Frame Rate" 
                        name="frameRate" 
                        className="casual-field" 
                        type="text" 
                        value={frameRate}
                        placeholder="กรุณาเลือกอุปกรณ์" 
                        disabled={true}
                    />
                    <InputField 
                        label="Day/Night" 
                        name="dayNight" 
                        className="casual-field" 
                        type="text" 
                        value={dayNight}
                        placeholder="กรุณาเลือกอุปกรณ์" 
                        disabled={true}
                    />
                    <InputField 
                        label="Lens" 
                        name="lens" 
                        className="casual-field" 
                        type="text" 
                        value={lens}
                        placeholder="กรุณาเลือกอุปกรณ์" 
                        disabled={true}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" id="cancel-btn" onClick={() => setOpenModal(false)}>ยกเลิก</button>
                    <button type="button" id="submit-btn" onClick={handleSubmit}>เพิ่ม</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddDevice