import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuildingCRUD.css';
import ModalAddCarpark from '../../components/modal/ModalAddCarpark';
import axios from 'axios';

function BuildingCRUD() {
  const firstRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const navigate = useNavigate();

  const fetchBuildings = useCallback(async () => {
    try {
      const response = await axios.get('/smartparking/api/info/building/all');
      //กรองข้อมูลและเลือกแค่ building object ที่มีคุณสมบัติ "display" เป็น true
      const filteredData = response.data.data.filter(building => building.display);
      setPlaceList(filteredData);
      setLoading(false);
    } 
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      fetchBuildings();
    }
  }, [fetchBuildings]);

  const addNewPlace = useCallback(newPlace => {
    setPlaceList(prevPlace => [...prevPlace, newPlace]);
  }, []);

  const handleClick = useCallback(buildingID => {
    navigate('/EXT/show-parking', { state: { buildingID } });
  }, [navigate]);

  const handleDelete = useCallback(async (e, buildingID) => {
    e.stopPropagation();

    const postData = {
      buildingID: buildingID,
      status: false,
    };

    const header = {
      accessToken: localStorage.getItem('accessToken'),
    };

    try {
      await axios.post('/smartparking/api/gateway/display/building', postData, { headers: header });
      setPlaceList(prevPlace => prevPlace.filter(place => place.buildingID !== buildingID));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cardElements = useMemo(() => {
    return placeList.map(place => (
      <div key={place.buildingID} className="card-item" onClick={() => handleClick(place.buildingID)}>
        <div className="inner-card-parking">
          <div className="action-btn-container">
            <button onClick={e => handleDelete(e, place.buildingID)}>
              <i className="fa-solid fa-square-xmark"></i>
            </button>
          </div>
          <img src={place.image} alt="" />
          <div className="card-title">{place.buildingName}</div>
        </div>
      </div>
    ));
  }, [placeList, handleClick, handleDelete]);




  return (
    <div className='CARPARKCRUD-root'>
      {modalOpen && <ModalAddCarpark setOpenModal={setModalOpen} setPlace={addNewPlace} />}
      <div className='CARPARKCRUD-title'>
        <h1>
          กรุณาเลือกสถานที่จอดรถ
        </h1>
      </div>

      {loading? (<p>Loading...</p>) : (
        <div className='PARKCARDS-container'>
            {cardElements}

            <div className="card-item" onClick={() => {setModalOpen(true);}}>
              <div className="inner-card-adder">
                <div className='card-icon'>
                  <i className="fa-solid fa-circle-plus"></i>
                </div>
                <div className="card-title">
                  เพิ่มที่จอดรถ
                </div>
              </div>
            </div>
            
        </div>
      )}

    </div>
  )
}

export default BuildingCRUD