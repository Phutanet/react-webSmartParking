import React, {useEffect, useState, useMemo, useRef} from 'react';
import axios from 'axios';
import { useTable } from "react-table";

function MessageDealing() {
  const firstRender = useRef(true);
  const [messageArray, setMessageArray] = useState([]);
  const data = useMemo(() => [...messageArray], [messageArray]);

  const handleDelete = (id) => {
    const token = { accessToken: `${localStorage.getItem("accessToken")}` };
    const postData = {id: id};

    axios
      .delete('/smartparking/contact/delete', {headers:token, data:postData})
      .then(() => {
        setMessageArray((prev) => prev.filter((msg) => msg._id !== id));
      })
      .catch((err) => {
        console.log(err);
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

  const tableInstance = useTable({ columns, data });
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =  tableInstance



  return (
    <>
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
    </>
  );
};

export default MessageDealing;