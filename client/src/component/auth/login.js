import React,{useState,useEffect} from 'react'

import { Link,useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/authAction';
import { useDispatch,useSelector } from 'react-redux';
import Loading from '../../layoutes/Loading'
const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector(state =>state.userLogin) 
  const {loading,error,userInfo} = userLogin
  const [typePass,setTypePass] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleSubmit = e =>{
    e.preventDefault()
    dispatch(login(email,password))
  }
  return (
    <>
    {loading && <Loading/>}
      <div className='auth_page'>
        
          <form onSubmit={handleSubmit}>
            <h3 className='text-uppercase text-center mb-2'>8-Network</h3>
            <div className="mb-3">
             <label htmlFor="exampleInputEmail1" className="form-label ">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} onChange={(e) => setEmail(e.target.value)}  />
           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
           </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
         <div className='pass'>
         <input type={ typePass ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
         <small onClick={() => setTypePass(!typePass)}>
               {typePass ? 'Hide': 'show'}
           </small>
          </div>
        </div>
        {error && <h6 style={{color:'red'}}>{error}</h6>}
        <button type="submit" className="btn btn-dark w-100" disabled={email && password ? false : true}>login</button>
        <p className='my-2'>
          You don`t have an account ? <Link to='/register' style={{color:'crimson'}}>Register</Link>
        </p>
        </form>
      </div>
      </>
  );
}

export default Login;
