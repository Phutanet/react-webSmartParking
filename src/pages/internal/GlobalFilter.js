import React from 'react';
import './GlobalFilter.css';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div id='filter-field'>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} placeholder='กรุณาใส่คำค้นหา'/>
    </div>
  );
};
