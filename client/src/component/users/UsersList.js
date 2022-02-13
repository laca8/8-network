import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
const UsersList = ({user,handleCloseAll}) => {
    return (
        <div className='d-flex p-2 align-item-center user justify-content-between userList'>
       <Link  to={`/profile/${user._id}`} onClick={handleCloseAll} className='d-flex align-item-center user1'>
       <img src={user.avatar} className='big-avatar'/>
         <div className='ml-1' style={{transform:'translateY(-2px)',textAlign:'left'}}>
             <span className='d-block'>{user.name}</span>
         </div> 
       </Link>
     </div>
    )
}

export default UsersList
