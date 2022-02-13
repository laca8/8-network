import axios from "axios"
import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_LIKE_FAIL, CREATE_LIKE_REQUEST, CREATE_LIKE_SUCCESS, CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, LIST_POSTS_FAIL, LIST_POSTS_REQUEST, 
    LIST_POSTS_SUCCESS, POST_ERROR, REMOVE_COMMENT_FAIL, REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_LIKE_FAIL, REMOVE_LIKE_REQUEST, REMOVE_LIKE_SUCCESS, REMOVE_POST_FAIL, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS,UPDATE_LIKES } from "./types"

export const getPosts = () => async (dispatch,getState) =>{
    dispatch({
        type:LIST_POSTS_REQUEST
    })
    const {userLogin :{userInfo}} = getState()
    const config = {
        headers:{
            token:userInfo.token
        }
    }
    try {
        const res = await axios.get('/api/post',config)
        dispatch({
            type:LIST_POSTS_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:LIST_POSTS_FAIL,
            payload:{
                error:err.response && err.response.data.msg
            }
        })
    }
}

export const createPost = (content,image) => async (dispatch,getState) =>{
    dispatch({
        type:CREATE_POST_REQUEST
    })
    const {userLogin :{userInfo}} = getState()
    const config = {
        headers:{
            'Content-Type':'application/json',
            token:userInfo.token
        }
    }
    try {
        const res = await axios.post('/api/post',{content,image},config)
        dispatch({
            type:CREATE_POST_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:CREATE_POST_FAIL,
            payload:{
                error:err.response.data.msg
            }
        })
    }
}
export const deletePost = (id) => async (dispatch,getState) =>{
    dispatch({
        type:REMOVE_POST_REQUEST
    })
    const {userLogin:{userInfo}} = getState()
    const config = {
        headers:{
            token:userInfo.token
        }
    }
    try {
        const res = await axios.delete(`/api/post/${id}`,config)
        dispatch({
            type:REMOVE_POST_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:REMOVE_POST_FAIL,
            payload:{error:err.response.data.msg}
        })
    }
}
export const addComment = (postId,text) => async (dispatch,getState) =>{
   dispatch({
       type:CREATE_COMMENT_REQUEST
   })
    const {userLogin:{userInfo}} = getState()
    const config = {
        headers:{
            'Content-Type':'application/json',
            token:userInfo.token
        }
    }
    try {
        const res = await axios.put(`/api/post/comment/${postId}`,{text},config)
        dispatch({
            type:CREATE_COMMENT_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:CREATE_COMMENT_FAIL,
            payload:{error:err.response.data.msg}
        })
    }
}

export const deleteComment = (postId,commId) => async (dispatch,getState) =>{
    dispatch({
        type:REMOVE_COMMENT_REQUEST
    })
     const {userLogin:{userInfo}} = getState()
     const config = {
        headers:{
            'Content-Type':'application/json',
            token:userInfo.token
        }
    }
     try {
         const res = await axios.put(`/api/post/comment/${postId}/${commId}`)
         dispatch({
             type:REMOVE_COMMENT_SUCCESS,
             payload:commId
         })
     } catch (err) {
         dispatch({
             type:REMOVE_COMMENT_FAIL,
             payload:{error:err.response && err.response.data.msg}
         })
     }
 }

 export const addLike = (postId) => async (dispatch,getState) =>{
    dispatch({
        type:CREATE_LIKE_REQUEST
    })
     const {userLogin:{userInfo}} = getState()
     const config = {
         headers:{
             token:userInfo.token
         }
     }
     try {
         const res = await axios.put(`/api/post/like/${postId}`,null,config)
         dispatch({
             type:CREATE_LIKE_SUCCESS,
             payload:res.data
         })
     } catch (err) {
         dispatch({
             type:CREATE_LIKE_FAIL,
             payload:{error:err.response && err.response.data.msg}
         })
     }
 }
 
 export const deleteLike = (postId) => async (dispatch,getState) =>{
     dispatch({
         type:REMOVE_LIKE_REQUEST
     })
      const {userLogin:{userInfo}} = getState()
      const config = {
         headers:{
             token:userInfo.token
         }
     }
      try {
          const res = await axios.put(`/api/post/unlike/${postId}`,null,config)
          dispatch({
              type:REMOVE_LIKE_SUCCESS,
              payload:{postId,likes:res.data}
          })
      } catch (err) {
          dispatch({
              type:REMOVE_LIKE_FAIL,
              payload:{error:err.response && err.response.data.msg}
          })
      }
  }