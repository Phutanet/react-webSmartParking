import React from 'react'
import './PrevPageButton.css'
import { useNavigate } from 'react-router-dom'

function PrevPageButton() {
    const navigate = useNavigate()

    const backToPreviousPage = () => {
        navigate(-1)  // navigate back to previous page
    }

  return (
        <button className="prev-page-btn" onClick={backToPreviousPage}>
            <span>ย้อนกลับ</span>
        </button>
  )
}

export default PrevPageButton