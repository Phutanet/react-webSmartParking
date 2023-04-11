import React, { useCallback } from 'react'
import './PageNotFound.css'
import { useNavigate } from 'react-router-dom'


function PageNotFound() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className='page-layout'>
      <div id='NOTFOUND-PAGE-CONTAINER'>
        <div className='content'>
          <h1>404</h1>
          <strong>This page could not be found.</strong>
          <p>Sorry but the page you are looking for does not exist, <br />
            have been removed. name changed or is temporarily unavailable.
          </p>
          <button onClick={() => handleClick()}>GO TO HOMEPAGE</button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound