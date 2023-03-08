import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTable } from "react-table";
import PrevPageButton from '../../components/button/PrevPageButton';
import axios from 'axios';
import './DeviceInformation.css';

function DeviceInformation() {
    const location = useLocation();
    const buildingID = location.state.buildingID;
    const deviceID = location.state.deviceID;
    const floorIndex = location.state.floorIndex;
    const [device, setDevice] = useState({});
    const [details, setDetails] = useState([]);
    const data = useMemo(() => details,[details]);

    // console.log("buildingID =",buildingID);
    // console.log("deviceID =",deviceID);
    // console.log("floorIndex =",floorIndex);

    // console.log("device =",device);
    // console.log("details =",details);

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
        const fetchDevice = async () => {
            const token = {accessToken: localStorage.getItem('accessToken')};
            const postData = {
                buildingID: buildingID,
                floorIndex: floorIndex,
                deviceID: deviceID
            };

            try {
                const response = await axios.post("/smartparking/api/info/device/detail", postData, {headers: token});
                setDevice(response.data.data);
                setDetails(response.data.data.detail);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDevice();
    }, [buildingID, deviceID, floorIndex]);

    const tableInstance = useTable({ columns, data });
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =  tableInstance


  return (
    <div id='DEVICEINFO-root'>
        <PrevPageButton />

        <div id='DEVICCEINFO-title'>
            <h2>{device.deviceName}</h2>
        </div>

        <div id='DEVICEINFO-table-container'>
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
  );
};

export default DeviceInformation