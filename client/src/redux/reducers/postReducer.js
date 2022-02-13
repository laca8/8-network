import { LIST_POSTS_FAIL, LIST_POSTS_REQUEST, LIST_POSTS_SUCCESS, LIST_POSTS_RESET, CREATE_POST_REQUEST, CREATE_POST_SUCCESS,
     CREATE_POST_FAIL, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAIL,UPDATE_LIKES,POST_ERROR, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAIL, REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAIL, CREATE_LIKE_REQUEST, CREATE_LIKE_SUCCESS, CREATE_LIKE_FAIL, REMOVE_LIKE_REQUEST, REMOVE_LIKE_SUCCESS, REMOVE_LIKE_FAIL } from '../actions/types'
const initialState = {
    posts:[],
    post:{}
}
export const listPosts = (state={posts:[]},action)=>{
     const {type,payload} = action
    switch(type){
        case LIST_POSTS_REQUEST:
            return{
                loading:true
            }
        case LIST_POSTS_SUCCESS:
            return{
                ...state,
                posts:payload,
                loading:false
            }
        case LIST_POSTS_FAIL:
            return{
                loading:false,
                error:payload.error
            }
        case LIST_POSTS_RESET:
            return{}
        default:
            return state
    }
}
export const postCreate = (state={},action)=>{
    const {type,payload} = action
   switch(type){
       case CREATE_POST_REQUEST:
           return{
               loading:true
           }
       case CREATE_POST_SUCCESS:
           return{
               ...state,
               post:payload,
               loading:false,
               success:true
           }
       case CREATE_POST_FAIL:
           return{
               loading:false,
               error:payload.error
           }
       default:
           return state
   }
}
export const postDelete = (state={},action)=>{
    switch(action.type){
        case REMOVE_POST_REQUEST:
            return{
                loading:true
            }
        case REMOVE_POST_SUCCESS:
            return{
                ...state,
                loading:false,
                success:true
            }
        case REMOVE_POST_FAIL:
            return{
                error:action.payload.error,
                loading:false
            }
        default:
            return state
    }
}
export const commentCreate = (state = {post:{}} ,action)=>{
    const {type,payload} = action
    switch(type){
        case CREATE_COMMENT_REQUEST:
            return{
                loading:true
            }
        case CREATE_COMMENT_SUCCESS:
            return{
                ...state,
                loading:false,
               post:{...state.post,comments:payload},
            }
        case CREATE_COMMENT_FAIL:
            return{
                error:payload.error,
                loading:false
            }
        default:
            return state
    }
}

export const commentRemove = (state = {post:{}} ,action)=>{
    const {type,payload} = action
    switch(type){
        case REMOVE_COMMENT_REQUEST:
            return{
                loading:true
            }
        case REMOVE_COMMENT_SUCCESS:
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                      (comment) => comment._id !== payload
                    )
                  },
                  loading: false
            }
        case REMOVE_COMMENT_FAIL:
            return{
                error:payload.error,
                loading:false
            }
        default:
            return state
    }
}

export const likeCreate = (state = {posts:[]} ,action)=>{
    const {type,payload} = action
    switch(type){
        case CREATE_LIKE_REQUEST:
            return{
                loading:true
            }
        case CREATE_LIKE_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                loading: false,
            }
        case CREATE_LIKE_FAIL:
            return{
                error:payload.error,
                loading:false
            }
        default:
            return state
    }
}

export const likeRemove = (state = {posts:[]} ,action)=>{
    const {type,payload} = action
    switch(type){
        case REMOVE_LIKE_REQUEST:
            return{
                loading:true
            }
        case REMOVE_LIKE_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                loading: false,
            }
        case REMOVE_LIKE_FAIL:
            return{
                error:payload.error,
                loading:false
            }
        default:
            return state
    }
}