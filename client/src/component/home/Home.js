import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Posts from '../posts/Posts'
import CreatePost from '../posts/CreatePost'
import { useSelector } from 'react-redux'
const Home = () => {
    const [onCreate,setOnCreate] = useState(false)
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin 
    return (
       <div>
        <Header/>
    
        <div className='status my-3 d-flex'>
            <img src={userInfo.user.avatar} className='big-avatar'/>
            <button className='statusBtn flex-fill' onClick={() => setOnCreate(!onCreate) }>
                {userInfo.user.name} , what are you think ?
            </button>
        </div>
         <Posts/>
      <Footer/>
      {
          onCreate &&     <CreatePost setOnCreate={setOnCreate}/>
      }
       </div>
    )
}
export default Home