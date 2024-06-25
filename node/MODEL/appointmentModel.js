const mongoose = require('mongoose');

const appointmentSchema=mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId,ref:'user'},
    date:{type:Date,require},
    option:{ type:mongoose.Schema.Types.ObjectId,ref:'option'},
    hairDresser:{ type:mongoose.Schema.Types.ObjectId,ref:'hairDresser'}
  
}) 

module.exports =mongoose.model("appointment",appointmentSchema)