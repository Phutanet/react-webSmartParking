import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function PlacesForDevice() {
  const firstRender = useRef(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [parkingList, setParkingList] = useState([]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      axios
        .get('/smartparking/api/info/building/all')
        .then((res) => {
          setParkingList(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
  }, []);

  const handleClick = useCallback((buildingID) => {
    navigate('/INT/devices', { state: { buildingID: buildingID } })
  }, [navigate]);

  const cardElements = useMemo(() => {
    return parkingList.map((object) => {
      if (object.display === true) {
        return(
        <div key={object.buildingID} className="card-item" onClick={() => {handleClick(object.buildingID)}}>
          <div className="inner-card-parking">
          <img src={object.image ? object.image : "/images/image-default.png"} alt={object.buildingName} />
            <div className="card-title">{object.buildingName}</div>
          </div>
        </div>
        );
      };
      return null;
    });
  }, [parkingList, handleClick]);


  return (
    <div id='CARPARK-root'>
      <div id='CARPARK-title'>
        <h1>กรุณาเลือกสถานที่จอดรถ</h1>
      </div>
      <div id='CARPARK-container'>
        {loading? (<p>Loading...</p>) : (cardElements)}
      </div>
    </div>
  );
}

export default PlacesForDevice