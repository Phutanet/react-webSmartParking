import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
        ค้นหา:{' '}
        <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder='กรุณาใส่คำค้นหา'/>
    </span>
  )
}
