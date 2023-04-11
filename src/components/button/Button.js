import React from 'react';
import './Button.css';

function Button(props) {
  return (
    <div className={props.className}>
        <button 
            type={props.type}
            onClick={props.onClick}
            disabled={props.disable}
        >
            {props.label}
        </button>
    </div>
  );
};

export default Button