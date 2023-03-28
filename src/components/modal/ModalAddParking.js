import React, { useState, useEffect, useCallback } from "react"
import './PopupModal.css'
import InputField from '../fields/InputField'
import DuoInputField from "../fields/DuoInputField"
import axios from 'axios'
import Swal from 'sweetalert2'


const fetchBuildingList = async () => {
    try {
        const response = await axios.get("/smartparking/api/info/building/all");
        return(response.data.data);
    } catch (error) {
        console.log(error);
        return([]);
    };
};


function ModalAddParking({setOpenModal, setPlace}) {
    const [placeList, setPlaceList] = useState([]);
    const [placeID, setPlaceID] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [placeImage, setPlaceImage] = useState('');
    const [floorDetail, setFloorDetail] = useState([]);

    
    useEffect(() => {
        fetchBuildingList().then((data) => setPlaceList(data));
    }, []);

    // เมื่อ value ของ select เปลี่ยน, ฟังก์ชั่น handleChange จะทำงาน, 
    // โดยทำการกำหนดให้ selected มีค่าเท่ากับ Object ก้อนที่เลือก
    const handleChange = useCallback((event) => {
        const selected = placeList.find((place) => place.buildingID === event.target.value);
        setPlaceID(selected.buildingID);
        setPlaceName(selected.buildingName);
        setPlaceImage(selected.image);
        setFloorDetail(selected.floors);
    }, [placeList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = { accessToken: `${localStorage.getItem('accessToken')}` };
        const postData = {
            buildingID: placeID,
            status: true
        };
        // ส่งข้อมูลที่จำเป็นสำหรับใช้สร้างการ์ด
        const newPlace = {
            buildingID: placeID,
            buildingName: placeName,
            image: placeImage,
        };

        axios
            .post("/smartparking/api/gateway/display/building", postData, {headers: token})
            .then((res) => {
                Swal.fire({
                    title: 'เพิ่มสถานที่จอดรถสำเร็จ',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setPlace(newPlace);
                    setOpenModal(false);
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'ล้มเหลว',
                    text: err,
                    showConfirmButton: true
                })
            });
    };
    
    return (
        <div id="modal-popup-background">
            <div className="modal-container">
                <div className="modal-close-btn">
                    <button onClick={() => setOpenModal(false)}>
                        <i className="fa-solid fa-square-xmark"></i>
                    </button>
                </div>
                <div className="modal-header">
                    <h2>เพิ่มสถานที่จอดรถ</h2>
                </div>
                <div className="modal-body">
                    <div className="casual-field">
                        <label>ชื่อที่จอดรถ</label>
                        <select 
                            name="placeName" 
                            defaultValue="DEFAULT" 
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled>เลือกสถานที่จอดรถ</option>
                            {placeList.map((item, index) => {
                                if (item.display === false) {
                                    return(
                                        <option key={index} value={item.buildingID}>{item.buildingName}</option>
                                    );
                                };
                                return(null);
                            })}
                        </select>
                    </div>
                    <InputField 
                        label="รูปสถานที่" 
                        name="placeImage" 
                        className="casual-field" 
                        type="text" 
                        value={placeImage || ''} 
                        placeholder="กรุณาเลือกที่จอดรถ" 
                        disabled={true}
                    />
                    <InputField 
                        label="จำนวนชั้น" 
                        name="placeTotalFloor" 
                        className="casual-field" 
                        type="number" 
                        value={floorDetail.length} 
                        placeholder="กรุณาเลือกที่จอดรถ" 
                        disabled={true}
                    />
                    {floorDetail.map((floor, index) => 
                        <DuoInputField 
                            key={index} 
                            className="duo-field" 
                            stLable="ชื่อชั้น" 
                            stType="text" 
                            stValue={floor.floorName} 
                            stDisabled={true} 
                            ndLabel="ที่จอด" 
                            ndType="text" 
                            ndValue={floor.totalSlot} 
                            ndDisabled={true}
                        />
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" id="cancel-btn" onClick={() => setOpenModal(false)}>ยกเลิก</button>
                    <button type="button" id="submit-btn" onClick={handleSubmit}>เพิ่ม</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddParking