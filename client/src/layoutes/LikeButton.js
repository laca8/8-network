import React from 'react'

const LikeButton = ({displayLike,handleDeleteLike,handleLike}) => {
    return (
        <>
             {
                 displayLike ? <i className='fas fa-heart text-danger' onClick={handleDeleteLike}></i>
                 
                 :  <i className='far fa-heart ' onClick={handleLike} ></i>
                
             }
        </>
    )
}

export default LikeButton
