import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './BuildingCRUD.css'
import ModalAddParking from '../../components/modal/ModalAddParking'
import axios from 'axios'
import Swal from 'sweetalert2'


function BuildingCRUD() {
    const firstRender = useRef(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [parkingList, setParkingList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchParking = useCallback(async () => {
        try {
            const response = await axios.get("/smartparking/api/info/building/all");
            //กรองข้อมูลและเลือกแค่ building object ที่มีคุณสมบัติ "display" เป็น true
            const parkingDisplay = response.data.data.filter(parking => parking.display);
            setParkingList(parkingDisplay);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        };
    }, []);

    const addNewPlace = useCallback(newPlace => {
        setParkingList(prevPlace => [...prevPlace, newPlace]);
    }, []);

    const handleDelete = useCallback(async (e, buildingID, buildingName) => {
        e.stopPropagation();
        Swal.fire({
            title: `ยืนยันการลบ ${buildingName}`,
            text: 'เมื่อลบการ์ดสถานที่จอดรถยนต์จะไม่สามารถดูข้อมูลที่เกี่ยวข้องกับสถานที่',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: '#bd0026',
            confirmButtonText: 'ลบสถานที่',
            confirmButtonColor: '#00bd68',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const token = { accessToken: localStorage.getItem('accessToken') };
                const postData = {
                    buildingID: buildingID,
                    status: false
                };
                axios
                .post('/smartparking/api/gateway/display/building', postData, { headers: token })
                .then((res) => {
                    setParkingList(prevList => prevList.filter(parking => parking.buildingID !== buildingID));
                })
                .catch((err) => {
                    console.log(err);
                });
            };
        });
    }, []);

    //เมื่อ click ที่ card element จะไปยังหน้า showParking พร้อมทั้งส่ง buildingID prop เป็น state ไปด้วย
    const handleClick = useCallback((e, buildingID) => {
        e.stopPropagation();
        navigate('/EXT/show-parking', { state: { buildingID: buildingID } });
    }, [navigate]);

    const parkingCard = useMemo(() => {
        const toggle = (index) => {
            if (selected === index) {
                return setSelected(null);
            } else {
                return setSelected(index);
            }
        };

        return parkingList.map((parking, index) => {
            return(
            <div 
                key={parking.buildingID} 
                className='card-container' 
                onClick={() => {
                    toggle(index);
                }}
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
                <div className={selected === index ? "card-footer active" : "card-footer"}>
                    <button 
                        onClick={(e) => handleClick(e, parking.buildingID)}
                        >
                        <i className="fa-solid fa-square-arrow-up-right access-icon"></i>
                    </button>
                    <button
                        onClick={(e) => handleDelete(e, parking.buildingID, parking.buildingName)}
                        >
                        <i className="fa-solid fa-square-xmark delete-icon"></i>
                    </button>
                </div>
            </div>
            );
        });
    }, [parkingList, selected, handleClick, handleDelete]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            fetchParking();
        };
    }, [fetchParking]);



    return (
        <div className='page-layout'>
            {modalOpen && <ModalAddParking setOpenModal={setModalOpen} setPlace={addNewPlace} />}
            <div id='buildingCRUD-page-container'>
                <h1>จัดการ อาคาร/ลานจอดรถยนต์</h1>
                    {loading ? (<p>Loading...</p>) : (
                        <div className='card-group'>
                            {parkingCard}
                            <div className='adding-card-container' onClick={() => setModalOpen(true)}>
                                <button>
                                    <i className="fa-solid fa-circle-plus"></i>
                                    <p>เพิ่มสถานที่</p>
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default BuildingCRUD