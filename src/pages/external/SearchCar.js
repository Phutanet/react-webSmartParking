import React, { useEffect, useState, useRef, useMemo } from 'react';
import './SearchCar.css';
import Button2 from '../../components/button/Button2';
import videoBg from '../../assets/searchbg.mp4';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import { GlobalFilter } from '../internal/GlobalFilter';


function SearchCar() {
    const firstRender = useRef(true);
    const [showResult, setShowResult] = useState(false);
    const [vehicleId, setVehicleId] = useState('');
    const [province, setProvince] = useState('');
    const [provinceArray, setProvinceArray] = useState([]);
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

    const scrollToResult = () => {
        document.getElementById("search-section-2").scrollIntoView({ behavior:"smooth" })
    };

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
                setShowResult(true);
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
        if (showResult) {
            scrollToResult();
        };
    }, [showResult]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            axios.get('/smartparking/api/search/licenseplates/provinces')
            .then((res) => {
                setProvinceArray(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        };
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
    <div className='page-layout'>
        <section id='search-section-1'>
            <div className='overlay'></div>
            <video src={videoBg} autoPlay loop muted />
            <div id='content'>
                <h1>ค้นหารถยนต์ด้วยเลขทะเบียน</h1>
                <p>ระบุข้อมูลหมายเลขทะเบียนรถยนต์ของคุณเพื่อใช้ในการค้นหารายละเอียดข้อมูลการจอดรถยนต์</p>
                <form onSubmit={handleSubmit}>
                    <div className="search-field">
                        <input 
                            name="vehicleId"
                            type="text"
                            value={vehicleId}
                            onChange={(e) => setVehicleId(e.target.value)}
                            placeholder="กรอกชุดตัวอักษรตามด้วยชุดตัวเลข เช่น ษฮ4992"
                        />
                    </div>
                    <div className="search-field">
                        <select 
                            name="province"
                            defaultValue={"DEFAULT"}
                            onChange={(e) => setProvince(e.target.value)}
                        >
                            <option value="DEFAULT" disabled>เลือกจังหวัด</option>
                            {provinceArray.map((object) => 
                                <option key={object.numberID} value={object.province_EN}>{object.province_TH}</option>
                            )}
                        </select>
                    </div>

                    <Button2 className="id-btn" type="submit" label="ค้นหา" />
                </form>
            </div>
        </section>
        {/* end hero section */}

        { showResult && 
        <section id='search-section-2'>
            <div className='table-container'>
                <div className='table-header'>
                    <h1>ผลลัพธ์การค้นหา</h1>
                    {/* Search field */}
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>

                <div className='table-body'>
                {/* Result Table */}
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
                </div>

                <div className='table-footer'>
                    <span>
                        Page {pageIndex + 1} of {pageOptions.length}{' '}
                    </span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fa-solid fa-circle-arrow-left"></i>
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <i className="fa-solid fa-circle-arrow-right"></i>
                    </button>
                </div>

            </div>
        </section>
        }
    </div>
  );
};

export default SearchCar