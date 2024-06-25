const mongoose=require('mongoose')

// טבלת משתמשים
const userSchema=mongoose.Schema({
    firstName:{type:String,require},
    lastName:{type:String,require},
    password:{type:String,require},
    id:{type:Number,require},
    phone:{type:String,require},
    email:{type:String,require},
    isAnEmployee:{type:Boolean,require,default:false}  
})

module.exports =mongoose.model("user",userSchema)
