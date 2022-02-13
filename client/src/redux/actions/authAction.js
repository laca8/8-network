import axios from 'axios'
import { LOGIN_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS, REGISTER_USER_FAIL, USER_LOGOUT, 
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL, EDIT_PROFILE_RESET, LIST_POSTS_RESET, LIST_USERS_RESET, DETAILS_USER_RESET } from '../actions/types'
export const login = (email,password) => async (dispatch) =>{
     dispatch({
         type:LOGIN_USER_REQUEST,
     })
     try {
        const config = {
            headers:{
                "Content-Type":"application/json",
            }
        }
         const res = await axios.post('/api/login',{email,password},config)
         dispatch({
             type:LOGIN_USER_SUCCESS,
             payload:res.data
         })
         localStorage.setItem('userInfo',JSON.stringify(res.data))
     } catch (err) {
        dispatch({
            type:LOGIN_USER_FAIL,
            payload:{
                error:err.response.data.msg
            }
        })
     }
}

export const register = (name,email,password,gender) => async (dispatch) =>{
    dispatch({
        type:REGISTER_USER_REQUEST,
    })
    try {
        const config = {
            headers:{
                "Content-Type":"application/json",
            }
        }
        const res = await axios.post('/api/register',{name,email,password,gender},config)
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:res.data
        })
        dispatch({
            type:LOGIN_USER_SUCCESS,
            payload:res.data
        })
        localStorage.setItem('userInfo',JSON.stringify(res.data))
    } catch (err) {
       dispatch({
           type:REGISTER_USER_FAIL,
           payload:{
               error:err.response.data.msg
           }
       })
    }
}
export const logout = () => async dispatch => {
    dispatch({
        type:USER_LOGOUT,
    })
    dispatch({
        type:EDIT_PROFILE_RESET
    })
    dispatch({
        type:LIST_POSTS_RESET
    })
    dispatch({
        type:LIST_USERS_RESET
    })
    dispatch({
        type:DETAILS_USER_RESET
    })
    localStorage.removeItem('userInfo')
}

export const profileEdit = (name,gender,avatar,story,mobile,address) => async (dispatch,getState) =>{
    dispatch({
        type:EDIT_PROFILE_REQUEST,
    })
    const {userLogin :{userInfo}} = getState()
    try {
        const config = {
            headers:{
                "Content-Type":"application/json",
                token: userInfo.token
            }
        }
        const res = await axios.post('/api/users',{name,gender,avatar,story,mobile,address},config)
        dispatch({
            type:EDIT_PROFILE_SUCCESS,
            payload:res.data
        })
        dispatch({
            type:LOGIN_USER_SUCCESS,
            payload:res.data
        })
        localStorage.setItem('userInfo',JSON.stringify(res.data))
    } catch (err) {
       dispatch({
           type:EDIT_PROFILE_FAIL,
           payload: err.response && err.response.data.msg
       })
    }
}