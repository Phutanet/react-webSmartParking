import React from 'react'
import './Field.css'

function DuoInputField(props) {
  return (
    <div className={props.className}>
      <label>{props.stLable}</label>
        <input 
            name={props.stName} 
            type={props.stType} 
            value={props.stValue} 
            disabled={props.stDisabled} 
        />

        <label>{props.ndLabel}</label>
        <input 
            name={props.ndName} 
            type={props.ndType} 
            value={props.ndValue} 
            disabled={props.ndDisabled} 
        />
    </div>
  );
};

export default DuoInputField