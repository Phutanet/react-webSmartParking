import React from 'react'
import './Field.css'

// function SelectField(props) {
//     return (
//         <div className={props.className}>
//             <label>{props.label}</label>
//             <select 
//             name={props.name} 
//             defaultValue={props.defaultValue} 
//             onChange={props.onChange} 
//             >
//                 <option value={props.defaultValue} id='selected-placeholder' disabled>{props.placeholder}</option>
//                 {props.options.map((object,index) =>
//                 <option key={index} value={object.option}>{object.option}</option>
//                 )}
                
//             </select>
//         </div>
//       )
// }

// export default SelectField

function SelectField(label, name, className, defaultValue, onChange, placeholder, arrayData) {
    return (
        <div className={className}>
            <label>{label}</label>
            <select 
            name={name} 
            defaultValue={defaultValue} 
            onChange={onChange} 
            >
                <option value={defaultValue} id='selected-placeholder' disabled>{placeholder}</option>
                {arrayData.map((item,index) =>
                <option key={index} value={item}>{item}</option>
                )}
                
            </select>
        </div>
      )
}

export default SelectField