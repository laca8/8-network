const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = async (req,res,next) =>{
    const token = req.header('token')
    if(!token){
        return res.status(404).json({msg:'token is not valid'})
    }
    try {
        const decoded = await jwt.verify(token,'laca')
        if(!decoded){
            return res.status(400).json({msg:'Invalid Authentication.'})
        }
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        console.log(err);
        return res.status(404).json({msg:'user not authorized'})
    }
}
module.exports = auth