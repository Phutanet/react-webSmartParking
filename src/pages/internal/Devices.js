import React, { useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrevPageButton from '../../components/button/PrevPageButton';
import './Devices.css';
import ModalAddDevice from '../../components/modal/ModalAddDevice';


function Devices() {
    const location = useLocation();
    const navigate = useNavigate();
    const buildingID = location.state.buildingID;
    const firstRender = useRef(true);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [placeInfo, setPlaceInfo] = useState({});
    const [floors, setFloors] = useState([]);
    const [devices, setDevices] = useState([]);

    const addNewDevice = useCallback(newDevice => {
        setDevices(prevDevice => [...prevDevice, newDevice]);
      }, []);

    const handleDelete = useCallback(async (e, buildingID, floorIndex, deviceID) => {
        e.stopPropagation();

        const token = {
            accessToken: localStorage.getItem('accessToken'),
          };

        const postData = {
            buildingID: buildingID,
            floorIndex: floorIndex,
            deviceID: deviceID,
            status: false
        };

        try {
            await axios.post('/smartparking/api/gateway/display/device', postData, {headers:token});
            setDevices(prevDevices => prevDevices.filter(device => device.deviceID !== deviceID))
        } catch (err) {
            console.log(err);
        }
    }, []);


    const handleClick = useCallback((deviceID, floorIndex) => {
        navigate('/INT/device-information', { 
            state: { 
                buildingID: buildingID,
                deviceID: deviceID,
                floorIndex: floorIndex
             } 
            });
      }, [navigate, buildingID]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = ({'accessToken': `${localStorage.getItem('accessToken')}`});
            const postData = ({buildingID:buildingID});

            axios
                .post('/smartparking/api/info/building/detail', postData, {headers: token})
                .then((res) => {
                    setPlaceInfo(res.data.data);
                    setFloors(res.data.data.floor);
                    const filteredDevices = res.data.data.devices.filter(device => device.display);
                    setDevices(filteredDevices);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };
    }, [buildingID]);

    const cardElements = useMemo(() => {
        return floors.map((floor) => (
            <div key={floor.floorIndex} className='floor-header'>
                <label className='floor-label'>{floor.floorName}</label>
                <div className="floor-container">
                    {devices.map((device) => {
                        if (device.floorIndex === floor.floorIndex) {
                            return(
                            <div key={device.deviceID} className="card-item" onClick={() => {handleClick(device.deviceID, device.floorIndex)}}>
                                <div className="inner-card-parking">
                                    <div className="action-btn-container">
                                        <button onClick={e => handleDelete(e, buildingID, device.floorIndex, device.deviceID, )}>
                                            <i className="fa-solid fa-square-xmark"></i>
                                        </button>
                                    </div>
                                    <img src={device.image ? device.image : "/images/image-default.png"} alt={device.deviceName} />
                                    <div className="card-title">{device.deviceName}</div>
                                </div>
                            </div>
                            );
                        };
                        return null;
                    })}

                </div>
            </div>
        ));
    }, [buildingID, floors, devices, handleClick, handleDelete]);


  return (
    <div id='DEVICES-root'>
        {modalOpen && <ModalAddDevice setOpenModal={setModalOpen} buildingID={buildingID} setDevice={addNewDevice}/>}
        <div id='DEVICES-banner'>
            <PrevPageButton />
            <button id='add-device-btn' onClick={() => {setModalOpen(true);}}>
                <span>เพิ่มอุปกรณ์</span>
            </button>
        </div>
        <div id='DEVICES-title'>
            <h2>{placeInfo.buildingName}</h2>
        </div>

        {loading ? (<p>Loading...</p>) : (cardElements)}



    </div>
  );
};

export default Devices