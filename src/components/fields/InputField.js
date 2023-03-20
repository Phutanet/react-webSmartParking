import React, { useState } from 'react';
import './Field.css';

function InputField(props) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={props.className}>
        <label>{props.label}</label>
        <input 
          name={props.name} 
          type={props.type} 
          value={props.value} 
          onChange={props.onChange} 
          placeholder={props.placeholder} 
          disabled={props.disabled} 
          required={props.required} 
          pattern={props.pattern} 
          onBlur={handleFocus} 
          focused={focused.toString()}
        />
        <span>{props.errMessage}</span>
    </div>
  );
};

export default InputField