import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import InputField from "../fields/InputField";
import Button from "../button/Button";
import "./ModalAddCarpark.css";

const fetchBuildings = async () => {
  try {
    const response = await axios.get("/smartparking/api/info/building/all");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

function AddParking({setOpenModal, setPlace}) {
  const [placeList, setPlaceList] = useState([]);
  const [placeID, setPlaceID] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeImage, setPlaceImage] = useState('');


  useEffect(() => {
    fetchBuildings().then((data) => setPlaceList(data));
  }, []);


  // เมื่อ value ของ select เปลี่ยน, ฟังก์ชั่น handleChange จะทำงาน, โดยทำการกำหนดให้ selected มีค่าเท่ากับ Object ก้อนที่เลือก
  const handleChange = useCallback((event) => {
      const selected = placeList.find((place) => place.buildingID === event.target.value);
      setPlaceID(selected.buildingID);
      setPlaceName(selected.buildingName);
      setPlaceImage(selected.image);
    }, [placeList]);


  const handleSubmit = () => {
    const postData = ({
      buildingID: placeID,
      status: true,
    });
    const header = {
      'accessToken': `${localStorage.getItem('accessToken')}`,
    };
    const newPlace = {
      buildingID:placeID,
      buildingName:placeName,
      image:placeImage,
    };

    axios
    .post("/smartparking/api/gateway/display/building", postData, {headers: header})
    .then(res => {
      Swal.fire({
        title: 'เพิ่มสถานที่จอดรถสำเร็จ',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      setPlace(newPlace);
    })
    .catch(err => {
      Swal.fire({
        title: 'ล้มเหลว',
        text: err,
        showConfirmButton: true,
      });
    });

    // setOpenModal(false);
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
              <h2>เพิ่มสถานที่จอดรถ</h2>
          </div>

          <div className="modal-body">
            <form>
              <div className='normal-field'>
                <label>ชื่อที่จอดรถ</label>
                <select name='placeName' defaultValue='DEFAULT' onChange={handleChange}>
                  <option value='DEFAULT' id='selected-placeholder' disabled>เลือกสถานที่จอดรถ</option>
                  {placeList.map((item,index) => {
                    if (item.display === false) {
                      return (
                        <option key={index} value={item.buildingID}>{item.buildingName}</option>
                      );
                    };
                    return null;
                  })};
                </select>
              </div>

              <InputField 
                label="รูปสถานที่"
                name="placeImage" 
                className="disable-field" 
                type="text" 
                value={placeImage || ''} 
                placeholder="กรุณาเลือกที่จอดรถ" 
                disabled={true} 
              />
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

export default AddParking