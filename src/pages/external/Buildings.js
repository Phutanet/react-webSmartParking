import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './Buildings.css'
import axios from 'axios'


function Buildings() {
    const firstRender = useRef(true);
    const navigate = useNavigate();
    const [parkingList, setParkingList] = useState([]);

    const fetchParking = useCallback(async () => {
        try {
            const response = await axios.get("/smartparking/api/info/building/all");
            //กรองข้อมูลและเลือกแค่ building object ที่มีคุณสมบัติ "display" เป็น true
            const parkingDisplay = response.data.data.filter(parking => parking.display);
            setParkingList(parkingDisplay);
        }
        catch (error) {
            console.log(error);
        };
    }, []);

    //เมื่อ click ที่ card element จะไปยังหน้า showParking พร้อมทั้งส่ง buildingID prop เป็น state ไปด้วย
    const handleClick = useCallback((buildingID) => {
        navigate('/parking-info', { state: { buildingID: buildingID } });
    }, [navigate]);

    const parkingCard = useMemo(() => {
        return parkingList.map((parking) => {
            return(
            <div 
                key={parking.buildingID} 
                className='card-container' 
                onClick={() => handleClick(parking.buildingID)}
            >
                <div className='card-header'>
                    <img 
                        src={parking.image ? parking.image : "/images/pexels-matt-hardy-2658459.jpg"} 
                        alt={parking.buildingName}
                    />
                </div>
                <div className='card-body'>
                    <p>{parking.buildingName}</p>
                </div>
            </div>
            );
        });
    }, [parkingList, handleClick]);
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            fetchParking();
        };
    }, [fetchParking]);

    return (
        <div className='page-layout'>
            <div id='BUILDINGS-PAGE-CONTAINER'>
                <h1>อาคาร/ลานจอดรถยนต์</h1>
                <div className='card-group'>
                    {parkingCard}
                </div>
            </div>
        </div>
    );
};

export default Buildings