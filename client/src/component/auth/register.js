import React,{useState,useEffect} from 'react'
import Loading from '../../layoutes/Loading'
import { Link,useHistory } from 'react-router-dom';
import { login, register } from '../../redux/actions/authAction';
import { useDispatch,useSelector } from 'react-redux';
const Register = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userRegister = useSelector(state =>state.userRegister) 
  const {loading,error,userInfo} = userRegister
  const [typePass,setTypePass] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [gender,setGender] = useState('male')
  useEffect(()=>{
    if(userInfo && userInfo.token) history.push('/')
},[userInfo,history])
  const handleSubmit = e =>{
    e.preventDefault()
    dispatch(register(name,email,password,gender))
  }
  return (
    <>
     {loading && <Loading/>}
      <div className='auth_page'>
          <form onSubmit={handleSubmit}>
            <h3 className='text-uppercase text-center mb-2'>8-Network</h3>
            {error && <h6 style={{color:'red',textAlign:'center'}}>{error}</h6>}
            <div className="mb-3">
             <label htmlFor="name" className="form-label ">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={name} 
              onChange={(e) => setName(e.target.value)}  />
           </div>
            <div className="mb-3">
             <label htmlFor="exampleInputEmail1" className="form-label ">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={email} 
              onChange={(e) => setEmail(e.target.value)}  />
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
        <div className='row justify-content-between mx-0 mb-1 '>
    <label htmlFor='male'>
      Male:<input type='radio' id='male' name='gender' value='male' defaultChecked onChange={(e) => setGender(e.target.value)}/>

    </label>
    <label htmlFor='female'>
      Female:<input type='radio' id='female' name='gender' value='female'  onChange={(e) => setGender(e.target.value)}/>

    </label>
    <label htmlFor='other'>
      other:<input type='radio' id='other' name='gender' value='other'  onChange={(e) => setGender(e.target.value)}/>

    </label>
    
  </div>
        
        <button type="submit" className="btn btn-dark w-100" >Register</button>
        <p className='my-2'>
          You  have an account ? <Link to='/login' style={{color:'crimson'}}>Login</Link>
        </p>
        </form>
      </div>
      </>
  );
}

export default Register;
