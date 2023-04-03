import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTable } from "react-table"
import PrevPageButton from '../../components/button/PrevPageButton'
import './DeviceInformation2.css'
import axios from 'axios'



function DeviceInformation2() {
    const location = useLocation();
    const firstRender = useRef(true);
    const buildingID = location.state.buildingID;
    const floorIndex = location.state.floorIndex;
    const deviceID = location.state.deviceID;
    const [device, setDevice] = useState({});
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = { accessToken: `${localStorage.getItem('accessToken')}` };
            const postData = {
                buildingID: buildingID,
                floorIndex: floorIndex,
                deviceID: deviceID
            };

            axios
                .post("/smartparking/api/info/device/detail", postData, {headers: token})
                .then((res) => {
                    setDevice(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }, [buildingID, floorIndex, deviceID]);
    
    return (
        <div className='page-layout'>
            <div id='profile-content'>
                <div className='table-container'>
                    ////
                </div>
            </div>
        </div>
    );
};

export default DeviceInformation2