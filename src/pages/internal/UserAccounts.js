import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import DataTable from 'react-data-table-component'
import './UserAccounts.css'


function UserAccounts() {
  const firstRender = useRef(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [usersArray, setUsersArray] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;

      const header = {
        'accessToken': `${localStorage.getItem('accessToken')}`
      }

      axios.get('/smartparking/profile/all', {headers: header})
      .then(res => {
        setUsersArray(res.data['data'])
      })
      //instead of a catch() block so that we don't swallow
      .catch(err => {
        console.log(err)
      })
    }
  }, []);


  const columns = [
    {
      name: 'Name',
      selector: row => row.firstname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Create date',
      selector: row => row.create_at,
      sortable: true,
    },
    {
      name: 'Latest update',
      selector: row => row.update_latest,
      sortable: true,
    },
    {
      name: 'Delete account',
      cell: row => 
      <div id="delete-account-container">
      <button id="delete-account-btn" onClick={() => handleDelete(row)}>
        <i className="fa-solid fa-trash"></i>
      </button>
      </div>
    }
  ];


  const filteredUsersArray = usersArray.filter((user) => {
    return user.email.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  }

  const handleDelete = (row) => {
    console.log(row);
  }

  
    return (
    <div className="root">
      <div id="accounts-container-section-1">

        <div className="table-header-container">
          <h2>รายการบัญชีผู้ใช้</h2>
        </div>

        <div id="search-field-container">
          <label>ค้นหา</label>
          <input type="text" placeholder="กรุณากรอกอีเมล" value={searchText} onChange={handleSearch} />
        </div>

        <div className="table-body-container">
          <DataTable 
          columns={columns}
          data={filteredUsersArray}
          pagination
          />
        </div>
      </div>
    </div>
    )
}

export default UserAccounts