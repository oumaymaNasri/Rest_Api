const mongoose=require('mongoose')

const userModel=mongoose.Schema({
    name:{
        type:String, 
    },
    age:{
        type:Number,

    },
    location:{
        type:String ,

    },
    email :{
        type:String,

    }
})
module.exports=mongoose.model('User',userModel) 