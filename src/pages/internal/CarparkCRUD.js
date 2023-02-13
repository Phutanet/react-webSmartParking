import React, { useState } from 'react'
import './CarparkCRUD.css'
import ModalAddCarpark from '../../components/modal/ModalAddCarpark'

function Parkingcrud() {
  const [modalOpen, setModalOpen] = useState(false)
  const [parkingList, setParkingList] = useState([])

  const addNewParking = (newParking) => {
    // เพิ่ม prop object ลงใน parkingList
    setParkingList((prevParkingList) => {
      return [...prevParkingList, newParking]
    });
  }

  // สร้าง Parking card จากสมาชิกใน array parkingList
  const cardElements = parkingList.map((object, index) => {
    return (
    <div key={index} className="card-item">
      <div className="inner-card-parking">
        <img src={object.image} alt="" />
        <div className="card-title">{object.name}</div>
      </div>
    </div>
    );
  });

  return (
    <div className='CARPARKCRUD-root'>
      {modalOpen && <ModalAddCarpark setOpenModal={setModalOpen} setParking={addNewParking} />}
      <div className='CARPARKCRUD-title'>
        <h1>กรุณาเลือกสถานที่จอดรถ</h1>
      </div>

      <div className='PARKCARDS-container'>
          {/* Card Parking */}
          {cardElements}

          {/* Card Create */}
          <div className="card-item" onClick={() => {setModalOpen(true);}}>
            <div className="inner-card-adder">
              <div className='card-icon'>
                <i className="fa-solid fa-circle-plus"></i>
              </div>
              <div className="card-title">เพิ่มที่จอดรถ</div>
            </div>
          </div>
          
      </div>
    </div>
  )
}

export default Parkingcrud