import React, {useEffect} from 'react'
import axios from 'axios'

function SystemSetting() {
  useEffect(() => {
    const header = {
      'accessToken': `${localStorage.getItem('accessToken')}`
    }

    axios
    .get('/smartparking/auth/roles', {headers: header})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>SystemSetting</div>
  )
}

export default SystemSetting