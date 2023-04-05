import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTable } from "react-table"
import PrevPageButton from '../../components/button/PrevPageButton'
import './DeviceInformation.css'
import axios from 'axios'



function DeviceInformation() {
    const location = useLocation();
    const firstRender = useRef(true);
    const buildingID = location.state.buildingID;
    const floorIndex = location.state.floorIndex;
    const deviceID = location.state.deviceID;
    const [device, setDevice] = useState({});
    const [details, setDetails] = useState([]);
    const data = useMemo(() => details, [details]);

    const columns = useMemo(() => [
        {
            Header: 'รายการ',
            accessor: 'name'
        },
        {
            Header: 'รายละเอียด',
            accessor: 'value'
        }
    ], []);

    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = { accessToken: `${localStorage.getItem('accessToken')}` };
            const postData = {
                buildingID: buildingID,
                floorIndex: floorIndex,
                deviceID: deviceID
            };

            axios
                .post("/smartparking/api/info/device/detail", postData, {headers: token})
                .then((res) => {
                    setDevice(res.data.data);
                    setDetails(res.data.data.detail);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }, [buildingID, floorIndex, deviceID]);

    const tableInstance = useTable({ columns, data });
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =  tableInstance;
    
    return (
        <div className='page-layout'>
            <div id='DEVINFO-page-container'>
                <PrevPageButton />
                <div id='DEVINFO-page-content'>
                    <div className='image-container'>
                        <img 
                            src={device.image ? device.image : "/images/pexels-photomix-company-96612.jpg"} 
                            alt={device.deviceName}
                        />
                    </div>
                    <div className='table-container'>
                        <div className='table-header'>
                            <h1>{device.deviceName}</h1>
                        </div>
                        <div className="table-body">
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
            </div>
        </div>
    );
};

export default DeviceInformation