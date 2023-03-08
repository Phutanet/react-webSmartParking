import React, { useState, useEffect, useRef, useMemo } from 'react';
import './SearchCar.css';
import axios from 'axios';
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import { GlobalFilter } from '../internal/GlobalFilter';
import Swal from 'sweetalert2';


function SearchPage() {
    const firstRender = useRef(true);
    const [provinceArray, setProvinceArray] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [province, setProvince] = useState('');
    const [carList, setCarList] = useState([]);
    const data = useMemo(() => carList, [carList]);

    const columns = useMemo(() => [
        {
            Header: 'ลำดับ',
            accessor: (row, index) => index + 1
        },
        {
            Header: 'ทะเบียนรถยนต์',
            accessor: 'license_plate_text'
        },
        {
            Header: 'จังหวัด',
            accessor: 'license_plate_province'
        },
        {
            Header: 'สถานที่จอดรถยนต์',
            accessor: 'building.buildingName'
        },
        {
            Header: 'ชั้น',
            accessor: 'floor.floorName'
        },
        {
            Header: 'เวลาที่เข้ามาใช้บริการ',
            accessor: 'time_in'
        }
    ], []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = ({
            text: vehicleId,
            province: province
        });

        axios
            .post('/smartparking/api/search/licenseplates', data)
            .then((res) => {
                setCarList(res.data.data);
            })
            .catch((err) => {
                Swal.fire({
                    title: 'ค้นหาไม่สำเร็จ',
                    text: err.response.data.msg,
                    icon: 'error',
                    showConfirmButton: true
                })
                console.log(err);
            });
    };

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;

            axios.get('/smartparking/api/search/licenseplates/provinces')
            .then(res => {
                setProvinceArray(res.data['data'])
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, []);

    const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);
    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage, 
        canNextPage, 
        canPreviousPage, 
        pageOptions, 
        prepareRow, 
        state, 
        setGlobalFilter
    } =  tableInstance;

    const { globalFilter } = state
    const { pageIndex } = state


        return (
            <div id='search-root'>
                <div className='hero-container'>
                    <h1>ค้นหารถยนต์ด้วยเลขทะเบียน</h1>
        
                    <form id='search-form' onSubmit={handleSubmit}>
                        <div className='search-input-field'>
                            <input 
                            type="text"
                            name="vehicleId"
                            onChange={(e) => setVehicleId(e.target.value)}
                            value={vehicleId}
                            placeholder="กรอกชุดตัวอักษรตามด้วยชุดตัวเลข เช่น ษฮ4992" 
                            />
                        </div>
        
                        <div className='search-select-field'>
                            <select 
                            name="province"
                            defaultValue={'DEFAULT'}
                            onChange={(e) => setProvince(e.target.value)}
                            >
                                <option value="DEFAULT" disabled>เลือกจังหวัด</option>
                                {provinceArray.map((object) => 
                                <option key={object.numberID} value={object.province_EN}>{object.province_TH}</option>
                                )}
                            </select>
                        </div>
        
                        <button className="search-button" type="submit">ค้นหา</button>
                    </form>
                    
                </div>
                <div id="search-section2">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, index) => (
                                        <th key={index} {...column.getHeaderProps(column.getSortByToggleProps)}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, index) => {
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
                    <div>
                        <span>
                            Page {pageIndex + 1} of {pageOptions.length}{' '}
                        </span>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>prev</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>next</button>
                    </div>
                </div>
            </div>
          );
};

export default SearchPage