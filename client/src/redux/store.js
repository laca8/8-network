import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLogin,userRegister,editProfile} from './reducers/authReducer'
import { commentCreate, commentRemove, likeCreate, likeRemove, listPosts, postCreate, postDelete } from './reducers/postReducer'
import { detailsUser, listUsers } from './reducers/userReducer'
const reducer = combineReducers({
    userLogin:userLogin,
    userRegister:userRegister,
    editProfile:editProfile,
    listPosts:listPosts,
    postCreate:postCreate,
    postDelete:postDelete,
    listUsers:listUsers,
    detailsUser:detailsUser,
    commentCreate:commentCreate,
    commentRemove:commentRemove,
    likeCreate:likeCreate,
    likeRemove:likeRemove
})
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store