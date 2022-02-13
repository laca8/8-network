import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { deleteComment, getPosts } from '../../../redux/actions/postAction'
const DisplayComment = ({post}) =>{
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin 

    const listPosts = useSelector(state=> state.listPosts)
    const {posts,loading,error} = listPosts
     const handleDelete = (postId,commId) =>{
         dispatch(deleteComment(postId,commId))
         dispatch(getPosts())
     }
    return(
       <div className='comments' >
           {
               post.comments.map(comment => (
                <div className='comment_card mt-2' >
               
                <div className='comment_content' style={{display:'flex',justifyContent:'space-between'}}>
                <Link to={`/profile/${comment.user}`} className='d-flex text-dark' style={{marginRight:'2rem'}}>
                   <img src={comment.avatar} className='small-avatar'/>
                   <h6 className='mx-1' style={{marginTop:'1rem'}}>{comment.name}</h6>
                </Link>
                    <div className='flex-fill' >
                     <div>
                     <p>
                          {comment.text}
                    </p>
                     </div>
                     <div>
                         <small className='text-muted mr-3'>
                         {moment(comment.createdAt).fromNow()}
                        </small>
                        {
                            comment.user === userInfo.user._id ? 
                            <Link to='/' className='d-flex text-dark'>
                              <button className='btn btn-dark' type='button' onClick={() => handleDelete(post._id,comment._id)}>delete</button>
                            </Link> : <p></p>
                        }
                     </div>
                    </div>
                </div>
          </div>
               ))
           }
       </div>
    )
}
export default DisplayComment