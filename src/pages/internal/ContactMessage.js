import React, {useEffect, useState, useMemo, useRef} from 'react';
import './ContactMessage.css';
import axios from 'axios';
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from './GlobalFilter';
import Swal from 'sweetalert2';

function ContactMessage() {
    const firstRender = useRef(true);
    const [messageArray, setMessageArray] = useState([]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'ยืนยันการลบข้อความ',
            text: 'เมื่อทำการลบข้อความจะไม่สามารถกู้คืนข้อความได้อีก',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: '#bd0026',
            confirmButtonText: 'ลบข้อความ',
            confirmButtonColor: '#00bd68',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                const token = { accessToken: `${localStorage.getItem("accessToken")}` };
                const postData = {id: id};
                axios
                    .delete('/smartparking/contact/delete', { headers: token, data: postData })
                    .then(() => {
                        setMessageArray((prev) => prev.filter((msg) => msg._id !== id));
                        Swal.fire({
                            title: 'ลบข้อความสำเร็จ',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'ลบข้อความไม่สำเร็จ',
                            text: err.response.data.msg,
                            icon: 'error',
                            showConfirmButton: true,
                        })
                    });
            };
        });
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const token = { accessToken: `${localStorage.getItem("accessToken")}` };
            axios
                .get('/smartparking/contact/get', { headers: token })
                .then((res) => {
                    setMessageArray(res.data.msg);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }, []);

    const data = useMemo(() => [...messageArray], [messageArray]);
    const columns = useMemo (() => [
        {
            Header:'ลำดับ',
            accessor: (row, index) => index +1
        },
        {
            Header:'อีเมล',
            accessor:'email'
        },
        {
            Header:'เบอร์โทรศัพท์',
            accessor:'phone'
        },
        {
            Header:'เรื่อง',
            accessor:'title'
        },
        {
            Header:'เนื้อความ',
            accessor:'msg'
        },
        {
            Header:'ลบ',
            accessor:'_id',
            Cell: ({ value }) => (
              <button className='td-delete-btn' onClick={() => handleDelete(value)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            )
        },
    ], []);

    const tableInstance = useTable({ columns, data }, useGlobalFilter, usePagination);
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

    const { globalFilter } = state;
    const { pageIndex } = state;

  return (
    <div className='page-layout'>
        <div id='CONTACTMSG-PAGE-CONTAINER'>
            <div className='table-container'>
                <div className='table-header'>
                    <h1>ข้อความติดต่อ</h1>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>

                <div className='table-body'>
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
                            {page.map((row) => {
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
        </div>
    </div>
  );
};

export default ContactMessage