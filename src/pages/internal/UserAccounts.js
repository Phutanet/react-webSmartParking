import React, { useState, useEffect, useRef, useMemo } from "react";
import "./UserAccounts.css";
import axios from "axios";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import { format } from "date-fns";
import { GlobalFilter } from "./GlobalFilter";
import ModalEditUserInformation from "../../components/modal/ModalEditUserInformation";
import ModalEditUserPassword from "../../components/modal/ModalEditUserPassword";
import Swal from 'sweetalert2';


const fetchUsersInformation = async () => {
  const token = {'accessToken': `${localStorage.getItem('accessToken')}`};
  try {
      const response = await axios.get("/smartparking/profile/all", {headers: token});
      return response.data.data;
  } catch (error) {
      console.log(error);
      return [];
  };
};


function UserAccounts() {
  const firstRender = useRef(true);
  const [usersArray, setUsersArray] = useState([]);
  const data = useMemo(() => [...usersArray], [usersArray]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditPass, setModalEditPass] = useState(false);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'ยืนยันการลบบัญชี',
      text: 'เมื่อทำการลบบัญชีจะไม่สามารถกู้คืนบัญชีได้อีก',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      cancelButtonColor: '#bd0026',
      confirmButtonText: 'ลบบัญชี',
      confirmButtonColor: '#00bd68',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const token = { accessToken: `${localStorage.getItem("accessToken")}` };
        const postData = {user_id: id};
        axios
          .delete('/smartparking/profile/delete', {headers:token, data:postData})
          .then(() => {
            setUsersArray((prev) => prev.filter((user) => user._id !== id));
            Swal.fire({
              title: 'ลบบัญชีสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch((err) => {
            Swal.fire({
              title: 'ลบบัญชีไม่สำเร็จ',
              text: err.response.data.msg,
              icon: 'error',
              showConfirmButton: true,
            })
          });
      };
    });
  };

  const handleEditInformation = (id) => {
    //ส่ง id ของ user ที่จะแก้ไขข้อมูล
    setSelectedUserId(id);
    //ส่งค่า boolean เพื่อ set การแสดงผล
    setModalOpen(true);
  };

  const updateCredentials = (postStatus) => {
    if (postStatus === 200) {
      fetchUsersInformation()
      .then((result) => setUsersArray(result));
    } else {
      return null;
    }
  };

  const handleEditPassword = (id) => {
    setSelectedUserId(id);
    setModalEditPass(true);
  };


  const columns = useMemo(() => [
    {
      Header:'User Information',
      columns: [
        {
          Header:'First name',
          accessor:'firstname'
        },
        {
          Header:'Email',
          accessor:'email'
        },
        {
          Header:'Role',
          accessor:'role'
        },
        {
          Header:'Registration',
          accessor:'create_at',
          Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}
        },
        {
          Header:'Latest update',
          accessor:'update_latest',
          Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}
        }
      ]
    },
    {
      Header:'Actions',
      columns: [
        {
          Header: "Delete / Edit info / Edit password",
          accessor: "_id",
          Cell: ({ value }) => (
            <>
              <button onClick={() => handleDelete(value)}>Del</button>
              <button onClick={() => handleEditInformation(value)}>Edit Info</button>
              <button onClick={() => handleEditPassword(value)}>Edit Pass</button>
            </>
          ),
        }
      ]
    }
  ], []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      fetchUsersInformation()
      .then((result) => setUsersArray(result));
    }
  }, []);


  //ลำดับของ arguments {useTable, useGlobalFilter, useSortBy, usePagination}
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
   } = tableInstance;

  const { globalFilter } = state
  const { pageIndex } = state



  return (
    <div id='USERACOUNTS-root'>
      {modalOpen && <ModalEditUserInformation setOpenModal={setModalOpen} userId={selectedUserId} updateCredentials={updateCredentials}/> }
      {modalEditPass && <ModalEditUserPassword setOpenModal={setModalEditPass} userId={selectedUserId}/> }

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps}>
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
          {page.map((row) => {
            prepareRow(row)
            return (
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
  );
}

export default UserAccounts;
