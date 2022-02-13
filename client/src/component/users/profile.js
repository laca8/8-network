import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Loading from '../../layoutes/Loading'
import Header from '../home/Header'
import Footer from '../home/Footer'
import EditProfile from './EditProfile'
import { getUserById } from '../../redux/actions/usersAction'
const Info = () =>{
 
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin 

    const {id} = useParams()
 
    const detailsUser = useSelector(state => state.detailsUser)
    const {profile,error,loading} = detailsUser
    const dispatch = useDispatch()
    const [showFollowers,setShowFollowers] = useState(false)
    const [showFollowing,setShowFollowing] = useState(false)
    const [edit,setEdit] = useState(false)
    useEffect(()=>{
        dispatch(getUserById(id))
    },[dispatch,id])
    return(
        <>
        <Header/>
        {loading && <Loading/>}
        {error && <h6>{error}</h6>}
        <div className='info'>
            
            <div className='info-container' >
                <img src={profile && profile.avatar} className='supper-avatar'/>
                <div className='info-content'>
                    <div className='info-content-title'>
                        <h2>{profile && profile.name}</h2>
                      
                           {
                             profile && profile._id === userInfo.user._id &&  <button className='btn btn-outline-dark' onClick={()=>  setEdit(true) }>
                             Edit Profile
                             </button>
                           }
            
                    </div>
                    <div className='follow_btn'>
                      <span className='mr-4' >
                      </span>
                      <span className='ml-4' style={{marginLeft:'1rem',color:''}} onClick={() => setShowFollowing(true)}>
                      </span>

                    </div>
                    <h6><span className='text-danger'>{profile && profile.mobile}</span></h6>
                    <p>{profile && profile.address}</p>
                    <h6>{profile && profile.email}</h6>
                    <p>{profile && profile.story}</p>



                </div>
            </div>
            {
                    edit && <EditProfile setEdit={setEdit}/>
            }
       </div>
        <Footer/>
        </>
    )
}
export default Info