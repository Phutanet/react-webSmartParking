import React from 'react';
import './Button2.css';

function Button2(props) {
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

export default Button2