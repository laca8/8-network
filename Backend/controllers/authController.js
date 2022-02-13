const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req,res) =>{
    const {name,email,password,avatar,mobile,address,gender,story} = req.body
    try {
        const userEmail = await User.findOne({email:email})
        if(userEmail){
            return res.status(400).json({msg:'email is already exist'})
        }
        const userName = await User.findOne({name:name})
        if(userName){
            return res.status(400).json({msg:'name is already exist'})
        }
        if(!name || !email || !password){
            return res.status(400).json({msg:'please fill fields'})
        }
        if(password.length < 6){
            return res.status(400).json({msg:'password not less 6 characters'})
        }
        const user = await new User({
            name,
            email,
            password,
            avatar,
            mobile,
            address,
            gender,
            story
        })
        const salt = await bcrypt.genSalt(12)
        user.password = await bcrypt.hash(user.password,salt)
        await user.save()
        const token = await jwt.sign({id:user._id},'laca',{
            expiresIn:'3d'
        })
        res.json({
            token,
            user
        })
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
const login = async (req,res) =>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({msg:'Invalid Credintails'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:'Invalid Credintails'})
        }
        const token = await jwt.sign({id:user._id},'laca',{
            expiresIn:'3d'
        })
        res.json({
            token,
            user
        })
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
module.exports = {
    register,
    login
}