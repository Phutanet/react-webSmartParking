import React from 'react'
import './PrevPageButton.css'
import { useNavigate } from 'react-router-dom'

function PrevPageButton() {
    const navigate = useNavigate();

    const backToPreviousPage = () => {
        navigate(-1)  // navigate back to previous page
    };
    
    return (
        <button className="back-btn" onClick={backToPreviousPage}>
            ย้อนกลับ
        </button>
    );
};

export default PrevPageButton