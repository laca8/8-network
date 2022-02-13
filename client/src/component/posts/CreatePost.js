import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { createPost, getPosts } from '../../redux/actions/postAction'
import { useHistory } from 'react-router-dom'
import Loading from '../../layoutes/Loading'
import axios from 'axios'
const CreatePost = ({setOnCreate}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [content,setContent] = useState('')
    const [image,setImage] = useState('')

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin 
    const postCreate = useSelector(state=> state.postCreate)
    const {success,loading,error} = postCreate 
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0] //because upload single image
        const formData = new FormData()
        formData.append('image', file)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/imagePost', formData, config)
    
          setImage(data)
        } catch (error) {
          console.error(error)
        }
      }
    useEffect(()=>{
        if(success){
             history.push('/')
             dispatch(getPosts())
        }
    },[success,history,dispatch])
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(userInfo && userInfo.token){
            e.preventDefault()
            dispatch(createPost(content,image))
        }
    }
    return (
        <div className='status_modal'>
        <form onSubmit={handleSubmit}>
        {loading && <Loading/>}
        {error && <h6 style={{color:'red'}}>{error}</h6>}
            <div className='status_header'>
               <h5 className='m-0'>Create Post</h5>
               <span onClick={() => setOnCreate(false)}>&times;</span>
            </div>
            <div className='status_body'>
                <textarea name='content' id=''  placeholder={`what are you thinking..?`}
                 value={content} onChange={e => setContent(e.target.value)} />
                
                 <div className='input_images'>
                         <i className='fas fa-camera' />
          
                <div className='file_upload'>
                    <i className='fas fa-image' ></i>
                    <input type='file' name='file' id='file' multiple accept='image/*' onChange={uploadFileHandler} 
                  />
                   
                
                </div>
            
            </div>
            </div>
            <div className='status_footer'>
                <button className='btn btn-dark w-100' type='submit'>Post</button>
            </div>
            
        </form>
    </div>
    )
}

export default CreatePost
