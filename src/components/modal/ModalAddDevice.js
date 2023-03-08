import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../button/Button";
import "./ModalAddCarpark.css";


function ModalAddDevice({setOpenModal, buildingID, setDevice}) {
    const firstRender = useRef(true);
    const [deviceList, setDeviceList] = useState([]);
    const [deviceId, setDeviceId] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [deviceImage, setDeviceImage] = useState('');
    const [floorIndex, setFloorIndex] = useState('');

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;

            const token = ({'accessToken': `${localStorage.getItem('accessToken')}`});
            const postData = ({buildingID: buildingID});

            axios
                .post('/smartparking/api/info/building/detail', postData, {headers:token})
                .then((res) => {
                    setDeviceList(res.data.data.devices);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }, [buildingID]);

    const handleChange = useCallback((event) => {
        const selected = deviceList.find((device) => device.deviceID === event.target.value);
        setDeviceId(selected.deviceID);
        setDeviceName(selected.deviceName);
        setDeviceImage(selected.image);
        setFloorIndex(selected.floorIndex);

    }, [deviceList]);

    const handleSubmit = () => {
        const token = {
            'accessToken': `${localStorage.getItem('accessToken')}`,
        };
        const postData = {
            buildingID: buildingID,
            floorIndex: floorIndex,
            deviceID: deviceId,
            status: true
        };

        const newDevice = {
            deviceID: deviceId,
            deviceName: deviceName,
            floorIndex: floorIndex,
            image: deviceImage
        };

        axios
            .post('/smartparking/api/gateway/display/device', postData, {headers: token})
            .then(() => {
                Swal.fire({
                    title: 'เพิ่มอุปกรณ์สำเร็จ',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                setDevice(newDevice);
            })
            .catch((err) => {
                Swal.fire({
                    title: 'ล้มเหลว',
                    text: err.msg,
                    icon: 'error',
                    showConfirmButton: true,
                });
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
                    <h2>เพิ่มอุปกรณ์กล้อง CCTV</h2>
                </div>

                <div className="modal-body">
                    <form>
                        <div className='normal-field'>
                            <label>ชื่อกล้อง</label>
                            <select name='deviceName' defaultValue='DEFAULT' onChange={handleChange}>
                                <option value='DEFAULT' id='selected-placeholder' disabled>เลือกกล้อง</option>
                                {deviceList.map((item,index) => {
                                    if (item.display === false) {
                                        return (
                                            <option key={index} value={item.deviceID}>{item.deviceName}</option>
                                        );
                                    };
                                    return null;
                                })};
                            </select>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <Button className='cancel-btn' onClick={() => {setOpenModal(false);}} label='ยกเลิก'/>
                    <Button className='submit-btn' onClick={handleSubmit} label='เพิ่ม'/>
                </div>
            </div>
        </div>
    );
};

export default ModalAddDevice