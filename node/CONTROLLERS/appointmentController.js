const { response } = require('express')
const appointmentModel=require('../MODEL/appointmentModel')
const {Types}=require('mongoose')
const toISOString= require('isodate')
const hairDresserModel=require('../MODEL/hairDresserModel')


//שליפת תורים עי קוד אישי
const getAppointmentByUserId = async (req, res) => {
    
    try {
        let id = req.params.id
       
        let appointment = await appointmentModel.find({user:Types.ObjectId(id)}).populate('user').populate('option').populate("hairDresser")
        // appointment.map((a)=>{
        //  let  hairDresser=  hairDresserModel.findById(a.hairDresser._id).populate("user")
        // console.log(hairDresser);
        //  return {...a,hairDresserName:hairDresser.hairDresser}
        // })
        res.json(appointment)
    }
    catch (error) {
        res.send('error :' + error)
    }
}
const getAppointmentByDate= async (req, res) => {
    try {
        const idHairDresser=req.params.id
        let start =new Date(req.params.date) ,end=new Date(req.params.date) 
        console.log(start);
        end.setHours(24,60,60);
       console.log(start,end);
        let appointment = await appointmentModel.find({date:{$gte:start,$lte:end},hairDresser:Types.ObjectId(idHairDresser)},{date:1})
        res.json( appointment)
    }
    catch (error) {
        res.send('error :' + error)
    }
}
const getAppointmentByHairDresserId = async (req, res) => {
    try {
        let id = req.params.id
       
        let appointments = await appointmentModel.find({hairDresser:Types.ObjectId(id)}).populate('user').populate('option').populate("hairDresser")
        res.json({"appointments" :appointments})
    }
    catch (error) {
        res.send('error :' + error)
    }
}
const getAppointmentById = async (req, res) => {
    try {
        let id = req.params.id
    
        let appointment = await appointmentModel.findById(id).populate('user').populate('option').populate("hairDresser")
        res.json(appointment)
    }
    catch (error) {
        res.send('error :' + error)
    }
}
const getAllAppointments = async (req, res) => {
    try {
        
        let h = await appointmentModel.find().populate('user').populate('option').populate("hairDresser")
        res.json( h)
    }
    catch (error) {
        res.send('error :' + error)
    }
}
// //שליפת מעצב שיער לפי שם
const getTimesByIdOfHairDresserAndOption = async (req, res) => {
    try {
        console.log("llllllllllllllllllllllllllllllllllllllll");
        let option = req.params.option;
        let hairDresser = req.params.id;
        let times = await appointmentModel.find({ option: option,hairDresser:hairDresser },{date:1})
        res.json({ times: times })
    }
    catch (error) {
        res.send('error :' + error)
    }
}
//יצירת תור חדש
const addAppointment = async(req, res) => {
    try{
          let appointment = req.body
    let New = new appointmentModel(appointment)
    
    console.log(New)
    await New.save().then(console.log("V"))
    res.json({messege:"the new hair stylist added successfully!"})
    }
    catch (error){
        res.send('error :' +error)
    }
}

// //עדכון מעצב שיער לפי שם
// const UpdateHairStylistByName = (req, res) => {
//     let name = req.params.name
//     let newNamehairStylist = req.body
//     hairStylistModel.findOneAndUpdate({ Name: name }, req.body).then((response) => {
//         res.send(`hello!! ${response} updated successfully`)

//     }).catch((error) => {
//         res.send('error :' + error)
//     })
// }

// //שליפת כל מעצבי השיער
// const getAllHairStylists = (req, res) => {
//     hairStylistModel.find().then((ress) => {
//      res.send(ress)})
//        .catch((err)=>{
//            res.send(err)
//        }) 
// }

//מחיקת תור
const deleteAppointment= (req, res) => {

    appointmentModel.findByIdAndDelete(req.params.id).then((data) => {
        res.send(data)
        console.log(req.params.id+"---------------------------------");
    }).catch((error) => {
        res.send(error)
    })
}


// //שליפת שעות עבודה
// const getTimeHairStylistById = async (req, res) => {
//     try { 
//         let id = req.params.id
//         let hairStylist = await hairStylistModel.findOne({ name: name })
//         res.json({ hairStylist: hairStylist })
//     }
//     catch (error) {
//         res.send('error :' + error)
//     }
// }

// //עדכון שעות עבודה
// const UpdateTimeHairStylistByName = (req, res) => {
//     console.log( req.params)
//     let name = req.params.name
//     let lastname = req.params.lastName
//     let newNamehairStylist = req.body.time
//     hairStylistModel.findOneAndUpdate({$and:[ {Name: name},{Last_Name:lastname} ]}, { time: newNamehairStylist }).then((response) => {
//         res.send(`hello!! ${response} updated hair successfully`)

//     }).catch((error) => {
//         res.send('error :' + error)
//     })
// }
//של הספר id  שליפת תורים על פי 
const updateAppointment = async (req, res) => {
    try {
        let id = req.params.id
        let appointment = req.body
   
        ans= await appointmentModel.findByIdAndUpdate(id,appointment)

        res.json(ans)
    }
    catch (error) {
        res.send('error :' + error)
    }
}

const getTimesByIdOfHairDresser = async (req, res) => {
    try {
        let id = req.params.id
   
console.log(id);
        let times = await appointmentModel.find({hairDresser:Types.ObjectId(id)},{date:1})
        res.json({ times: times })
    }
    catch (error) {
        res.send('error :' + error)
    }
}



module.exports={getAppointmentByDate,getAppointmentByHairDresserId,getTimesByIdOfHairDresser,getTimesByIdOfHairDresserAndOption,getAllAppointments,updateAppointment,addAppointment,getAppointmentByUserId,getAppointmentById,deleteAppointment}
