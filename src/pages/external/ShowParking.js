import React, {useEffect, useState, useMemo} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useTable } from "react-table";
import './ShowParking.css'
import PrevPageButton from '../../components/button/PrevPageButton';



function ShowParking() {
  const location = useLocation()
  const buildingID = location.state.buildingID
  const [buildingInfo, setBuildingInfo] = useState({})
  const [floorsArray, setFloorsArray] = useState([])
  const data = useMemo(() => floorsArray, [floorsArray])

  const columns = useMemo(() => [
    {
      Header: 'ชื่อชั้น',
      accessor: 'floorName'
    },
    {
      Header: 'จำนวนที่ว่าง',
      accessor: row => row.totalSlot - row.usage[0].occupied,
      Cell : ({ 
        row: { original: { totalSlot } }, 
        cell: { value } 
      }) => {
        let availableSlots = value;
        if (availableSlots <= 0) {
          availableSlots = "เต็ม";
        } else if (availableSlots > totalSlot) {
          availableSlots = totalSlot;
        }
        
        let backgroundColor;
        if (availableSlots <= 0) {
          backgroundColor = 'rgb(255, 153, 153)';
        } else if (availableSlots <= 5) {
          backgroundColor = 'rgb(255, 204, 153)';
        } else {
          backgroundColor = 'rgb(153, 255, 153)';
        }
        return <div style={{ backgroundColor }}>{availableSlots}</div>;
      }
    }
  ], [])

  useEffect(() => {
    const requestFloorsArray = async () => {
      const postData = {buildingID: String(buildingID)};

      try {
        const res = await axios.post("/smartparking/api/info/building", postData);
        setBuildingInfo(res.data['data'])
        setFloorsArray(res.data['data']['floor'])

      } catch (err) {
        console.log(err)
      }
    };

    // Call the post request function once on the first render
    requestFloorsArray();

    // Set the interval to call the post request function every 5 seconds, starting from the second call
    const interval = setInterval(requestFloorsArray, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
    
  }, [buildingID]);

  const tableInstance = useTable({ columns, data });
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =  tableInstance

  return (
    <div id='SHOWPARKING-root'>
      <div id='SHOWPARKING-banner'>
        <PrevPageButton />
      </div>

      <div id='SHOWPARKING-title'>
        <h2>{buildingInfo.buildingName}</h2>
      </div>

      <div id='SHOWPARKING-table-container'>
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
    

  )
}

export default ShowParking