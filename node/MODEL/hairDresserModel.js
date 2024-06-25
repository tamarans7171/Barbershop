const mongoose = require('mongoose');
const appointmentModel = require('./appointmentModel');

//טבלת שמות ופרטים של הספרים
const hairDresserSchema=mongoose.Schema({
    // Name:{type:String,require},
    // Last_Name:{type:String,require},
    user:{ type:mongoose.Schema.Types.ObjectId,ref:'user'},
    expertise:[{type:String,require}],
    // id:{type:Number,require},
    time:[{day:{type:Number,require},startTime:{type:Number,require},endTime:{type:Number,require}}],
    // appointment:[
    //     {time:{type:Date,require},}
    // ]
}) 

module.exports =mongoose.model("hairDresser",hairDresserSchema)

