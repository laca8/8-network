import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import Search from './Search'
const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const handelLogout = () =>{
        dispatch(logout())
    }
    return (
       <div className='header bg-light'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between align-middle " >
              <div className='container'>
          <Link className="navbar-brand" to="/">
              <h1 className="navbar-brand text-uppercase p-0 m-0" onClick={() => window.scrollTo({top:0})}>
               8-Network
              </h1>
              </Link>
              <Search/>
            <div className="dropdown" >
               <img className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false" src={userInfo && userInfo.user.avatar} className='small-avatar'/>
    
                 <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                 <li><Link className="dropdown-item" to={`/profile/${userInfo.user._id}`}>Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to='/' onClick={handelLogout} >Logout</Link></li>
            </ul>
           </div>
           </div>
      </nav>
      
       </div>
    )
}
export default Header