import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './ManageDevices.css'
import PrevPageButton from '../../components/button/PrevPageButton'
import ModalAddDevice from '../../components/modal/ModalAddDevice'
import axios from 'axios'
import Swal from 'sweetalert2'


function ManageDevices() {
    const location = useLocation();
    const navigate = useNavigate();
    const buildingID = location.state.buildingID;
    const firstRender = useRef(true);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [buildingDetail, setBuildingDetail] = useState({});
    const [floors, setFloors] = useState([]);
    const [deviceList, setDeviceList] = useState([]);

    const addNewDevice = useCallback(newDevice => {
        setDeviceList(prevList => [...prevList, newDevice]);
    }, []);

    const handleClick = useCallback((e, floorIndex, deviceID) => {
        e.stopPropagation();
        navigate('/internal/device-info', {
            state: {
                buildingID: buildingID,
                floorIndex: floorIndex,
                deviceID: deviceID
            }
        });
    }, [navigate, buildingID]);

    const handleDelete = useCallback(async (e, buildingID, floorIndex, deviceID, deviceName) => {
        e.stopPropagation();
        Swal.fire({
            title: `ยืนยันการลบ ${deviceName}`,
            text: 'เมื่อทำการลบการ์ดอุปกรณ์จะไม่สามารถดูข้อมูลที่เกี่ยวข้องกับอุปกรณ์',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: '#bd0026',
            confirmButtonText: 'ลบอุปกรณ์',
            confirmButtonColor: '#00bd68',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const token = { accessToken: localStorage.getItem('accessToken') };
                const postData = {
                    buildingID: buildingID,
                    floorIndex: floorIndex,
                    deviceID: deviceID,
                    status: false
                };

                axios
                    .post('/smartparking/api/gateway/display/device', postData, { headers: token })
                    .then((res) => {
                        setDeviceList(prevList => prevList.filter(device => device.deviceID !== deviceID));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            };
        });
    }, []);

    const content = useMemo(() => {
        return(
            floors.map((floor) => (
            <div key={floor.floorIndex} className='floor-slice'>
                <div className='floor-title'>
                    <label>{floor.floorName}</label>
                </div>
                <div className='floor-content'>
                    {deviceList.map((device, index) => {
                        const toggle = (cardIndex) => {
                            if (selected === cardIndex) {
                                return setSelected(null);
                            } else {
                                return setSelected(cardIndex);
                            }
                        };

                        if (device.floorIndex === floor.floorIndex) {
                            return(
                                <div 
                                    key={device.deviceID} 
                                    className='card-container'
                                    onClick={() => {
                                        toggle(index);
                                    }}
                                >
                                    <div className='card-header'>
                                        <img 
                                            src={device.image ? device.image :
                                                 "/images/Camera_test.jpg"
                                                } 
                                            alt={device.deviceName}
                                        />
                                    </div>
                                    <div className='card-body'>
                                        <p>{device.deviceName}</p>
                                    </div>
                                    <div className={selected === index ? "card-footer active" : "card-footer"}>
                                        <button 
                                            onClick={(e) => handleClick(e, device.floorIndex, device.deviceID)}
                                        >
                                            <i className="fa-solid fa-square-arrow-up-right access-icon"></i>
                                        </button>
                                        <button 
                                            onClick={(e) => handleDelete(e, buildingID, device.floorIndex, device.deviceID, device.deviceName)}
                                        >
                                            <i className="fa-solid fa-square-xmark delete-icon"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        } else {
                            return(null);
                        };
                    })}
                </div>
            </div>
            ))
        );
    }, [buildingID, floors, deviceList, selected, handleClick, handleDelete]);


    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = { accessToken: `${localStorage.getItem('accessToken')}` };
            const postData = { buildingID: buildingID };
            axios
                .post('/smartparking/api/info/building/detail', postData, { headers: token })
                .then((res) => {
                    setBuildingDetail(res.data.data);
                    setFloors(res.data.data.floor);
                    const deviceDisplayed = res.data.data.devices.filter(device => device.display);
                    setDeviceList(deviceDisplayed);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [buildingID]);


    return (
        <div className='page-layout'>
            {modalOpen && <ModalAddDevice setOpenModal={setModalOpen} buildingID={buildingID} setDevice={addNewDevice}/>}
            <div id='MANAGE-DEVICES-PAGE-CONTAINER'>
                <div id='MANAGE-DEVICES-PAGE-BANNER'>
                    <img 
                        src={buildingDetail.image ? buildingDetail.image : ""} 
                        alt={buildingDetail.buildingName}
                    />
                    <div className='banner-overlay'></div>
                    <PrevPageButton />
                    <button id='add-device-btn' onClick={() => setModalOpen(true)}>เพิ่มอุปกรณ์</button>
                </div>

                <h1 id='MANAGE-DEVICES-PAGE-TITLE'>{buildingDetail.buildingName}</h1>

                {loading ? (<p>Loading...</p>) : (
                    <div id='MANAGE-DEVICES-PAGE-CONTENT'>
                        {content}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageDevices