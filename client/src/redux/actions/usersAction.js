import axios from "axios"
import { DETAILS_USER_FAIL, DETAILS_USER_REQUEST, DETAILS_USER_SUCCESS, LIST_USERS_FAIL, LIST_USERS_REQUEST, LIST_USERS_SUCCESS } from "./types"

export const getUsers = (keyword='') => async (dispatch,getState) => {
    dispatch({
        type:LIST_USERS_REQUEST
    })
    const {userLogin:{userInfo}} = getState()
    const config = {
        headers:{
            token:userInfo.token
        }
    }
    try {
        const res = await axios.get(`/api/users?keyword=${keyword}`,config)
        dispatch({
            type:LIST_USERS_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:LIST_USERS_FAIL,
            payload:{error:err.response.data.msg}
        })
    }

}

export const getUserById = (id) => async (dispatch,getState) => {
    dispatch({
        type:DETAILS_USER_REQUEST
    })
    const {userLogin:{userInfo}} = getState()
    const config = {
        headers:{
            token:userInfo.token
        }
    }
    try {
        const res = await axios.get(`/api/users/${id}`,config)
        dispatch({
            type:DETAILS_USER_SUCCESS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:DETAILS_USER_FAIL,
            payload:{error:err.response && err.response.data.msg}
        })
    }

}