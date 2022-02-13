const Post = require('../models/Post')
const createPost = async (req,res)=>{
    const {content,image} = req.body
    try {
        const post = await new Post({
            content,
            image,
            user:req.user._id
        })
        await post.save()
        res.json(post)
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
const getPosts = async (req,res)=>{
    const {content,images} = req.body
    try {
        //const posts = await Post.find({user:[...req.user.following,req.user._id]}).sort('-createdAt').populate('user','avatar name')
        const posts = await Post.find().sort('-createdAt').populate('user','avatar name ')
        res.json(posts)
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
const updatePost = async (req,res)=>{
    const {content,images} = req.body
    try {
        const post = await Post.findById(req.params.id)
        if(post){
            post.content = content || post.content,
            post.images = images || post.images 
        }
        const updatePost = await post.save()
        res.json(updatePost)
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
const deletePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        await post.remove()
        return res.status(500).json({msg:'post deleted'})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
const like = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'post not found' })
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(404).json({ msg: 'post is already like' })

        }
        const newLike = {
            user: req.user._id
        }
        post.likes.unshift(newLike)
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:err.message})

    }
}
const unlike = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(500).json({ msg: 'post not found' })
        }
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(401).json({ msg: 'post is already unlike' })
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:err.message})
      
    }
}
const addComment = async (req,res)=>{
    try {
        const newComment = {
            text:req.body.text,
            user:req.user._id,
            avatar:req.user.avatar,
            name:req.user.name
        }
         const post = await Post.findOneAndUpdate({_id:req.params.id},{$push:{comments:newComment}},{new:true})
        
        res.json(post).populate('user','avatar name ')
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:err.message})
       
    }
}
const deleteComment = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        const comment = post.comments.find((comment) => comment.id == req.params.commId)

        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
          }
    post.comments = post.comments.filter(
        ({ id }) => id !== req.params.commId
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:err.message})
    }
}
module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    like,
    unlike,
    addComment,
    deleteComment

}