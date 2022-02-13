const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'
    },
    gender:{
        type:String,
        default:'male'
      },
      mobile:{
          type:String,
          default:''
      },
      address:{
          type:String,
          default:''
      },
      story:{
          type:String,
          default:'',
          maxLength:200
      },
})
module.exports = mongoose.model('user',userSchema)