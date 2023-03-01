import React, { useState, useEffect, useRef, useMemo } from "react";
import "./UserAccounts.css";
import axios from "axios";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import { format } from "date-fns";
import { GlobalFilter } from "./GlobalFilter";


function UserAccounts() {
  const firstRender = useRef(true);
  const [usersArray, setUsersArray] = useState([]);
  const data = useMemo(() => [...usersArray], [usersArray]);

  const handleDelete = (id) => {
    const token = { accessToken: `${localStorage.getItem("accessToken")}` };
    const postData = {user_id: id};
    axios
      .delete('/smartparking/profile/delete', {headers:token, data:postData})
      .then(() => {
        setUsersArray((prev) => prev.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = useMemo(() => [
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
    },
    {
      Header: "Delete",
      accessor: "_id",
      Cell: ({ value }) => (
        <button onClick={() => handleDelete(value)}>Del</button>
      ),
    }
  ], []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      const token = { accessToken: `${localStorage.getItem("accessToken")}` };

      axios
        .get("/smartparking/profile/all", { headers: token })
        .then((res) => {
          setUsersArray(res.data["data"]);
        })
        .catch((err) => {
          console.log(err);
        });
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
    <>
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
    </>
  );
}

export default UserAccounts;
