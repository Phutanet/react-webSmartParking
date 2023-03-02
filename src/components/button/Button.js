import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <div className='button-container'>
        <button 
          className={props.className} 
          onClick={props.onClick} 
          disabled={props.disabled}
          >
            {props.label}
        </button>
    </div>
  )
}

export default Button