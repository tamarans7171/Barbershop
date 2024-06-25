const mongoose=require('mongoose')

// טבלת אפשרויות שקיימות במספרה
//mongoose צריך להיות עם אות קטנה
const optionSchema=mongoose.Schema({
    name:{type:String,require},
    price:{type:Number,require},
    description:{type:String},
    // hairStylist:[{ type:mongoose.Schema.Types.ObjectId,ref:'Hair_stylist'}],
    srcImage:{type:String}

})

module.exports =mongoose.model("option",optionSchema)
