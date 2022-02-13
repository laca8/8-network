const User = require('../models/User')
const jwt = require('jsonwebtoken')
const getUsers = async (req,res) =>{
      try {
        const keyword = req.query.keyword ? {// ?keyord=iphone  || handfree
            name: {
                $regex:req.query.keyword,  //iph = iphone 
                $options:'i' // case insensitive
            }
          } : {}
      //search
        const users = await User.find({...keyword})
        .limit(10).select("name avatar")
          res.json(users)
      } catch (err) {
        return res.status(500).json({msg:err.message})
      }
}
const getUserById = async (req,res) =>{
    try {
        const user = await User.findById(req.params.id).select('-password')
        res.json(user)
    } catch (err) {
      return res.status(500).json({msg:err.message})
    }
}
const getProfile = async (req,res) =>{
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.json(user)
    } catch (err) {
      return res.status(500).json({msg:err.message})
    }
}
const updateUser = async (req,res) =>{
    const {name,avatar,mobile,story,address,gender} = req.body
    try {
        const user = await User.findById(req.user._id)
        if(user){
            user.name = name ||  user.name 
            user.avatar = avatar || user.avatar 
            user.mobile = mobile || user.mobile 
            user.address = address || user.address 
            user.gender = gender || user.gender
            user.story = story ||  user.story 
        }
         await user.save()
         const token = await jwt.sign({id:user._id},'laca',{
            expiresIn:'3d'
        })
        res.json({user,token})
    } catch (err) {
      return res.status(500).json({msg:err.message})
    }
}
const follow = async (req,res)=>{
  try {

    const newUser = await User.findOneAndUpdate({_id: req.params.id}, { 
        $push: {followers: req.user._id}
    }, {new: true}).populate("followers following", "-password")

    await User.findOneAndUpdate({_id: req.user._id}, {
        $push: {following: req.params.id}
    }, {new: true})

    res.json(newUser)

} catch (err) {
    return res.status(500).json({msg: err.message})
}
}
const unfollow = async (req,res) =>{
  try {

    const newUser = await User.findOneAndUpdate({_id: req.params.id}, { 
        $pull: {followers: req.user._id}
    }, {new: true}).populate("followers following", "-password")

    await User.findOneAndUpdate({_id: req.user._id}, {
        $pull: {following: req.params.id}
    }, {new: true})

    res.json(newUser)

} catch (err) {
    return res.status(500).json({msg: err.message})
}
}
module.exports = {
    getUsers,
    getUserById,
    updateUser,
    follow,
    unfollow,
    getProfile
}