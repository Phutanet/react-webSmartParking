import React, { useState, useEffect, useRef } from "react";
import './ModalAddCarpark.css'
import axios from 'axios'
import InputField from '../fields/InputField'
import DuoInputField from "../fields/DuoInputField";
import Button from '../button/Button'


function AddParking({setOpenModal, setParking}) {
  const firstRender = useRef(true)
  const [dataResponse, setDataResponse] = useState([])
  const [selectParking, setSelectParking] = useState(null)
  const [parkingName, setParkingName] = useState('')
  const [parkingImage, setParkingImage] = useState('')
  const [parkingTotalFloor, setParkingTotalFloor] = useState(0)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      axios.get('https://api.github.com/users')
      .then(res => {
        setDataResponse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])

// ทำการ set properties ต่างๆไว้ในตัวแปร, ทำงานเมื่อมีการเปลี่ยนแปลงค่า selectParking
  useEffect(() => {
    if (selectParking) {
      setParkingName(selectParking.login);
      setParkingImage(selectParking.avatar_url);
      setParkingTotalFloor(selectParking.id);
    }
  }, [selectParking]);

// เมื่อ value ของ select เปลี่ยน, ฟังก์ชั่น handleChange จะทำงาน, โดยทำการกำหนดให้ selected มีค่าเท่ากับ Object ก้อนที่เลือก
  const handleChange = (e) => {
    const selected = dataResponse.find((place) => place.login === e.target.value);
    setSelectParking(selected);
  };


  const newParking = {
    name:parkingName,
    image:parkingImage,
    totalFloor:parkingTotalFloor
  }


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
                <select name='parkingName' defaultValue='DEFAULT' onChange={handleChange}>
                  <option value='DEFAULT' id='selected-placeholder' disabled>เลือกสถานที่จอดรถ</option>
                  {dataResponse.map((item,index) => 
                  <option key={index} value={item.login}>{item.login}</option>
                  )}
                </select>
              </div>

              <InputField 
                label="รูปสถานที่" 
                name="parkingImage" 
                className="disable-field" 
                type="text" 
                value={parkingImage} 
                placeholder="กรุณาเลือกที่จอดรถ" 
                disabled={true} 
              />

              <InputField 
                label="จำนวนชั้น" 
                name="parkingTotalFloor" 
                className="disable-field" 
                type="number" 
                value={parkingTotalFloor} 
                placeholder="กรุณาเลือกที่จอดรถ" 
                disabled={true} 
              />

              {Array.from({ length: parkingTotalFloor }, (_, index) => (
              <DuoInputField 
                key={index}
                label1="ชื่อชั้น" 
                label2="ที่จอด"
                name1="floorName" 
                name2="totalParkingSlot"
                className="duo-field" 
                type="text" 
                // value1={}
                // value2={}
                disabled={true} 
              />
              ))}

            </form>
          </div>

          <div className="modal-footer">
            <Button className='cancel-btn' onClick={() => {setOpenModal(false);}} label='ยกเลิก'/>
            <Button className='submit-btn' onClick={() => setParking(newParking)} label='เพิ่ม'/>
          </div>

        </div>
      </div>
  );
}

export default AddParking;