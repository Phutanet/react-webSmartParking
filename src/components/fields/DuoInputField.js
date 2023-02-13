import React from 'react'
import './Field.css'

function DuoInputField(props) {
  return (
    <div className={props.className}>
        <label>{props.label1}</label>
        <input 
        name={props.name1} 
        type={props.type} 
        value={props.value1} 
        disabled={props.disabled} 
        />

        <label>{props.label2}</label>
        <input 
        name={props.name2} 
        type={props.type} 
        value={props.value2} 
        disabled={props.disabled} 
        />
    </div>
  )
}

export default DuoInputField