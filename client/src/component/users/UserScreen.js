import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getUserById } from '../../redux/actions/usersAction'
import {useParams} from 'react-router-dom'
const UserScreen = () => {
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin 

    const {id} = useParams()
    const detailsUser = useSelector(state => state.detailsUser)
    const {user,error,loading} = detailsUser
    useEffect(()=>{
      if(userInfo.user._id === id){
        dispatch(getUserById(id))
      }
    },[dispatch,userInfo])
    return (
        <div>
            
        </div>
    )
}

export default UserScreen
