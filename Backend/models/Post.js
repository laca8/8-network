const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    image:{
      type:String,
    },
    user:{
      type:mongoose.Types.ObjectId,
      ref:'user'
    },
    likes: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments:[
        {
        user:{
            type:mongoose.Types.ObjectId,
            ref:'user'
        },
        text:{
            type:String,
            required:true
        },
        avatar:{
            type:String
        },
        name:{
            type:String
        }

    }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    timestamps:true
})
module.exports = mongoose.model('post',postSchema)