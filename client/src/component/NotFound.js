import React from 'react'
const NotFound = () => {
  return (
      <div className='position-relative' style={{
          minWidth:'calc(100vh-70px)'
      }}>
          <h2 className='postion-absolute text-secondary' style={{top:'50%',left:'50%', transform:'translate(0%,500%)'}}>
          404 | Not Found.
          </h2>
      </div>
  );
}

export default NotFound;
