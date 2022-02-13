import { LIST_USERS_FAIL, LIST_USERS_REQUEST, LIST_USERS_RESET, LIST_USERS_SUCCESS
    ,DETAILS_USER_REQUEST,DETAILS_USER_SUCCESS,DETAILS_USER_FAIL,DETAILS_USER_RESET } from "../actions/types";

export const listUsers = (state={users:[]},action)=>{
    switch(action.type){
        case LIST_USERS_REQUEST:
            return {
                loading:true
            }
        case LIST_USERS_SUCCESS:
            return{
                ...state,
                users:action.payload,
                loading:false
            }
        case LIST_USERS_FAIL:
            return{
                loading:false,
                error:action.payload.error
            }
        case LIST_USERS_RESET:
            return{
                users:[]
            }
        default :
        return state
    }
}


export const detailsUser = (state={},action)=>{
    switch(action.type){
        case DETAILS_USER_REQUEST:
            return {
                loading:true
            }
        case DETAILS_USER_SUCCESS:
            return{
                ...state,
                profile:action.payload,
                loading:false
            }
        case DETAILS_USER_FAIL:
            return{
                loading:false,
                error:action.payload.error
            }
        case DETAILS_USER_RESET:
                return{
                   
                }
        default :
        return state
    }
}