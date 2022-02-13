import {
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    USER_LOGOUT,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_RESET,
} from '../actions/types'
const initialState = {

}
export const userLogin = (state = initialState,action) =>{
     switch(action.type){
         case LOGIN_USER_REQUEST:
         return {
             loading:true
         }
         case LOGIN_USER_SUCCESS:
             return {
                 ...state,
                 userInfo:action.payload,
                 loading:false
        }
        case LOGIN_USER_FAIL:
            return{
                error:action.payload.error,
                loading:false
        }
        case USER_LOGOUT:
            return{}
        default :
          return state
            
     }
}

export const userRegister = (state = initialState,action) =>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
        return {
            loading:true
        }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                userInfo:action.payload,
                loading:false
       }
       case REGISTER_USER_FAIL:
           return{
               error:action.payload.error,
               loading:false
       }
       default :
         return state
           
    }
}
export const editProfile = (state=initialState,action) =>{
    switch(action.type){
        case EDIT_PROFILE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case EDIT_PROFILE_SUCCESS:
            return{
                ...state,
                loading:false,
                userInfo:action.payload,
                success:true
            }
        case EDIT_PROFILE_FAIL:
            return{
                error:action.payload,
                loading:false
            }
        case EDIT_PROFILE_RESET:
                return {}
        default:
            return state
    }
}
