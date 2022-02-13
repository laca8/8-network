import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUsers } from '../../redux/actions/usersAction'
import UsersList from '../users/UsersList'
const Search = () =>{
  const dispatch = useDispatch()
  const [keyword,setKeyword] = useState('')
  const listUsers = useSelector(state => state.listUsers)
  const {users,error,loading} = listUsers
  useEffect(()=>{
    if(keyword){
      dispatch(getUsers(keyword))
    }
  },[dispatch,keyword])
  const handleClose = () => {
    setKeyword('')
}
      return(
        <>
        <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
        
      </form>
      <div className='users'>
              {
                  keyword && users && users.map(user=>(
                    <UsersList user={user} handleClose={handleClose}  key={user._id}/>
                  ))
              }
          </div>
      </>
      )
}
export default Search