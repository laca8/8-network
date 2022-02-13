import React,{useState,useEffect} from 'react'
import Loading from '../../layoutes/Loading'
import { Link,useHistory,useParams } from 'react-router-dom';
import { profileEdit } from '../../redux/actions/authAction';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
const EditProfile = ({setEdit}) => {
    const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const editProfile = useSelector(state =>state.editProfile) 
  const {loading,error,user,success} = editProfile

  const userLogin = useSelector(state =>state.userLogin) 
  const {userInfo} = userLogin

  const [name,setName] = useState('')
  const [gender,setGender] = useState('male')
  const [avatar,setAvatar] = useState('')
  const [story,setStory] = useState('')
  const [mobile,setMobile] = useState('')
  const [address,setAddress] = useState('')
  const [uploading, setUploading] = useState(false)
 
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0] //because upload single image
    const formData = new FormData()
    formData.append('avatar', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setAvatar(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  useEffect(()=>{
    if(success){
        history.push(`/profile/${userInfo.user._id}`)
    }else{
        setName(userInfo.user.name)
        setMobile(userInfo.user.mobile)
        setAddress(userInfo.user.address)
        setGender(userInfo.user.gender)
        setStory(userInfo.user.story)
    }
  },[success,userInfo])
  const handleSubmit = e =>{
    e.preventDefault()
    dispatch(profileEdit(name,gender,avatar,story,mobile,address))
  }
  return (
      <>
       {loading && <Loading/>}
      <div className='edit_profile'>
          <button className='btn btn-danger btn_close' onClick={()=>setEdit(false)}>
                close
            </button>
          <form onSubmit={handleSubmit}>

            <h3 className='text-uppercase text-center mb-2'>8-Network</h3>
            {error && <h6 style={{color:'red',textAlign:'center'}}>{error}</h6>}
            <div className="mb-3">
            <div className='info_avatar'>
                    <img className='supper-avatar' src={userInfo.user.avatar }  value={avatar}
                       onChange={(e) => setAvatar(e.target.value)} alt='' />
                    <span>
                        <i className='fas fa-camera'>
                            <p>change</p>
                        <input type='file' name='file' id='file_up' accept='image/*' onChange={uploadFileHandler}/>
                        </i>
                    </span>
                </div>
             <label htmlFor="name" className="form-label ">Name</label>
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' value={name} 
              onChange={(e) => setName(e.target.value)}  />
           </div>
           <div className='form-group'>
                    <label htmlFor='story'>story</label>
                    <textarea type='text' name='story' value={story} className='form-control' onChange={(e) => setStory(e.target.value)} cols='30' cols='4'></textarea>
                    <small className='text-danger d-block text-right' >
                            {story.length}/200
                        </small>
                </div>
           <div className='form-group'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input type='number' name='mobile' value={mobile} className='form-control' onChange={(e)=> setMobile(e.target.value)}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input type='text' name='address' value={address} className='form-control' onChange={(e) => setAddress(e.target.value)}/>
                </div>
           <label hrmlFor='gender'>Gender</label>
                <div className='input-group-prepend px-0 mb-4'>
                    <select name='gender' id='gender' className='custom-select text-capitalize form-select' onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
        <button type="submit" className="btn btn-dark w-100" >save</button>
        </form>
      </div>
      </>
  );
}

export default EditProfile;
