import React, {useEffect, useState, useMemo, useRef} from 'react';
import axios from 'axios';
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from './GlobalFilter';
import Swal from 'sweetalert2';

function MessageDealing() {
  const firstRender = useRef(true);
  const [messageArray, setMessageArray] = useState([]);
  const data = useMemo(() => [...messageArray], [messageArray]);

  // const handleDelete = (id) => {
  //   const token = { accessToken: `${localStorage.getItem("accessToken")}` };
  //   const postData = {id: id};

  //   axios
  //     .delete('/smartparking/contact/delete', {headers:token, data:postData})
  //     .then(() => {
  //       setMessageArray((prev) => prev.filter((msg) => msg._id !== id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'ยืนยันการลบข้อความติดต่อ',
      text: 'เมื่อทำการลบข้อความติดต่อจะไม่สามารถกู้คืนข้อความได้อีก',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      cancelButtonColor: '#bd0026',
      confirmButtonText: 'ลบข้อความ',
      confirmButtonColor: '#00bd68',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const token = { accessToken: `${localStorage.getItem("accessToken")}` };
        const postData = {id: id};
        axios
          .delete('/smartparking/contact/delete', {headers:token, data:postData})
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

  const columns = useMemo(() => [
    {
      Header:'Email',
      accessor:'email'
    },
    {
      Header:'Phone Number',
      accessor:'phone'
    },
    {
      Header:'Topic',
      accessor:'title'
    },
    {
      Header:'Message',
      accessor:'msg'
    },
    {
      Header:'Delete',
      accessor:'_id',
      Cell: ({ value }) => (
        <button onClick={() => handleDelete(value)}>Del</button>
      ),
    },
  ], []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      const token = { accessToken: `${localStorage.getItem("accessToken")}` };


      axios
        .get('/smartparking/contact/get', { headers: token })
        .then(res => {
          setMessageArray(res.data['msg']);
        })
        .catch(err => {
          console.log(err);
        });
    };
  }, []);

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
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
    <div>
      <span>
        Page {pageIndex + 1} of {pageOptions.length}{' '}
      </span>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>prev</button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>next</button>
    </div>
    </>
  );
};

export default MessageDealing;