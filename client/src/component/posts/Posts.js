import React, { useEffect } from 'react'
import Post from './Post'
import { useSelector,useDispatch } from 'react-redux'
import { getPosts } from '../../redux/actions/postAction'
import Loading from '../../layoutes/Loading'
const Posts = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin 

    const listPosts = useSelector(state=> state.listPosts)
    const {posts,loading,error} = listPosts


    useEffect(()=>{
       if(userInfo && userInfo.token){
            dispatch(getPosts())
       }
    },[dispatch,userInfo])
    return (
        <>
        {loading && <Loading/>}
        {error && <h6 style={{color:'red'}}>{error}</h6>}
        <div className='posts container'>
        {
            posts && posts.map(post=>(
                <Post post={post} key={post._id}/>
            ))
        }
       </div>
        </>
    )
}

export default Posts
