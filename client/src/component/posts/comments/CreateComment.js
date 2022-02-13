import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addComment, getPosts } from '../../../redux/actions/postAction'
import Loading from '../../../layoutes/Loading'
const CreateComment = ({post}) =>{
    const [text,setText] = useState('')
    const dispatch = useDispatch()
    const commentCreate = useSelector(state => state.commentCreate)
    const {loading,error,success} = commentCreate
    console.log(text)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addComment(post._id,text))
       setText('')
       dispatch(getPosts())
    }
    return(
        <form className='card-footer comment_input' onSubmit={handleSubmit}>
             {loading && <Loading/>}
            {error && <h6 style={{color:'red'}}>{error}</h6>}
          <input type='text' name='' id='' placeholder='add your comments...' value={text} onChange={e => setText(e.target.value)}/>
          <button type='submit' className='postBtn'>
              Post
          </button>
        </form>
    )
}
export default CreateComment