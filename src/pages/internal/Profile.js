import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Profile.css'
import axios from 'axios';
import { useTable, useFlexLayout } from 'react-table';
import { parseISO, format } from 'date-fns';

function Profile() {
    const firstRender = useRef(true);
    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        if (firstRender.current) {
        firstRender.current = false;
        const token = { accessToken: `${localStorage.getItem('accessToken')}` };
        axios
            .get('/smartparking/profile/me', { headers: token })
            .then((res) => {
                setCredentials(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        };
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'รายการ',
            accessor: 'field',
        },
        {
            Header: 'ข้อมูล',
            accessor: 'value',
        },
    ], []);

    const data = useMemo(() => {
        // Object.entries(credentials) will return an array of key-value pairs for the properties of the 'credentials'
        return Object.entries(credentials).map(([key, value]) => {
            if (key === 'update_latest' || key === 'create_at') {
                // ใช้ฟังก์ชั่น parseISO เพื่อแปลงค่า String value เป็น Date object
                const date = parseISO(value);
                // ใช้ฟังก์ชั่น format เพื่อจัดการข้อมูล Date object ให้แสดงผลในรูปแบบ 'dd/MM/yyyy HH:mm:ss'
                value = format(date, 'dd/MM/yyyy HH:mm:ss');
            }
            return {
                field: key,
                value: value,
            };
        });
    }, [credentials]);

  const tableInstance = useTable({ columns, data }, useFlexLayout);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="page-layout">
        <div id="PROFILE-page-container">
            <div className="table-container">
                <div className='table-header'>
                    <h1>ข้อมูลบัญชีผู้ใช้งาน</h1>
                </div>
                <div className="table-body">
                    <table {...getTableProps()}>
                        <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;
