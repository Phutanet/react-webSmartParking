import React, {useEffect, useState, useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import { useTable } from "react-table"
import PrevPageButton from '../../components/button/PrevPageButton'
import './ParkingInfo.css'
import axios from 'axios'

function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return currentTime;
};

function ParkingInfo() {
    const location = useLocation();
    const buildingID = location.state.buildingID;
    const currentTime = useCurrentTime();
    const [buildingDetail, setBuildingDetail] = useState({});
    const [floors, setFloors] = useState([]);
    const [visible, setVisible] = useState(true);
    const data = useMemo(() => floors, [floors]);

    const columns = useMemo(() => [
        {
            Header: 'ชื่อชั้น',
            accessor: 'floorName',
        },
        {
            Header: 'จำนวนที่ว่าง',
            accessor: row => row.totalSlot - row.usage[0].occupied,
            Cell: ({
                row: {original: {totalSlot}},
                cell: {value}
            }) => {
                let availableSlot = value;
                let backgroundColor;

                if (availableSlot > totalSlot) {
                    availableSlot = totalSlot;
                    backgroundColor = 'rgb(153, 255, 153)';
                } else if (availableSlot <= 0) {
                    availableSlot = 'เต็ม';
                    backgroundColor = 'rgb(255, 153, 153)';
                } else if (availableSlot <= 5) {
                    backgroundColor = 'rgb(255, 204, 153)';
                } else {
                    backgroundColor = 'rgb(153, 255, 153)';
                };
                return (
                    <div 
                        style={{ 
                            backgroundColor, 
                            padding: '10px'
                        }}
                    >
                        {availableSlot}
                    </div>
                );
            }
        }
    ], []);

    const tableInstance = useTable({ columns, data });
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =  tableInstance;

    const handleVisible = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const fetchBuildingDetail = async () => {
            const postData = {buildingID: String(buildingID)};
            try {
                const response = await axios.post("/smartparking/api/info/building", postData);
                setBuildingDetail(response.data.data);
                setFloors(response.data.data.floor);
            } catch (error) {
                console.log(error);
            }
        };

        // Call the post request function once on the first render
        fetchBuildingDetail();

        // Set the interval to call the post request function every 5 seconds, starting from the second call
        const interval = setInterval(fetchBuildingDetail, 2000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [buildingID]);
    
    return (
        <div className='page-layout'>
            <div id='PARKINGINFO-page-container'>
                <div className={visible ? "PARKINGINFO-page-banner-visible" : "PARKINGINFO-page-banner-hidden"}>
                    <img 
                        src={buildingDetail.image ? buildingDetail.image : ""} 
                        alt={buildingDetail.buildingName} 
                    />
                    <div className='banner-overlay'></div>
                    <PrevPageButton />
                    <button className='banner-visible-btn' onClick={handleVisible}>
                        {visible ? 
                            <i className="fa-solid fa-eye-slash"></i> 
                            : <i className="fa-solid fa-eye"></i>
                        }
                    </button>
                </div>
                <div id='PARKINGINFO-page-title'>
                    <h1>{buildingDetail.buildingName}</h1>
                    <h3>{currentTime}</h3>
                </div>
                <div id='PARKINGINFO-page-content'>
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, index) => (
                                    <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)
                                return(
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell, index) => {
                                            return <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ParkingInfo