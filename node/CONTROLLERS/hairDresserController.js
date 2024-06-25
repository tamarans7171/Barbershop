const { response } = require('express')
const hairDresserModel=require('../MODEL/hairDresserModel')


const getHairDresserByUserId = async( req , res ) => {
 
   try {
    let id = req.params.id
    console.log(id);
    let hairDresser = await hairDresserModel.findOne({user:id}).populate('user');
    console.log(hairDresser);
    res.json({ "hairDresser": hairDresser })
}
catch (error) {
    res.send('error :' + error)
}
//מציאת מעצב שיער עי קוד

}
const getHairDresserById = async( req , res ) => {
 
   try {
    let id = req.params.id
    console.log(id);
    let hairDresser = await hairDresserModel.findById(id).populate('user');
    res.json({ "hairDresser": hairDresser })
}
catch (error) {
    res.send('error :' + error)
}
//מציאת מעצב שיער עי קוד

}


//שליפת מעצב שיער לפי שם
const getHairDressersByOptionName = async (req, res) => {
    try {
        
        let name = req.params.name
        let hairDressers = await hairDresserModel.find({ expertise: name }).populate('user')
        res.json( {"hairDressers":hairDressers})
    }
    catch (error) {
        res.send('error :' + error)
    }
}
//יצירת ספר חדש
const addHairDresser = async(req, res) => {
    try{
          let hairDresser = req.body
    let NewHairDresser = new hairDresserModel(hairDresser)
    await NewHairDresser.save().then((response) => {
        res.json({"hairDresser": response})
    })
    }
    catch (error){
        res.send('error :' +error)
    }
}

//עדכון מעצב שיער לפי id
const updateHairDresserById = (req, res) => {
    let _id = req.params.id
    let newHairDresser = req.body
    hairDresserModel.findByIdAndUpdate(_id,newHairDresser).then((response) => {
        res.send(`hello!! ${response} updated successfully`)

    }).catch((error) => {
        res.send('error :' + error)
    })
}

//שליפת כל מעצבי השיער
const getAllHairDressers = async(req, res) => {
    hairDresserModel.find().populate("user").then((ress) => {
     res.send(ress)})
       .catch((err)=>{
           res.send(err)
       }) 
  

}

//מחיקת מעצב שיער
const deleteHairDresser = (req, res) => {

    hairDresserModel.findOneAndDelete(req.params.id).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
}


const AddExpertise=(req,res)=>{
    let id=req.params.id;
    let expertises=req.body.expertises;
    hairDresserModel.findById(id).then((data)=>{
        let expertise=[...expertises,...data.expertise]
        console.log(expertise);
        data.expertise=expertise;
        console.log(data);
        hairDresserModel.findByIdAndUpdate(id,data).then((d)=>{
            res.send("you updated: "+data)
        })
    
    })
}

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

module.exports={AddExpertise,getHairDresserById,getHairDressersByOptionName,getHairDresserByUserId,addHairDresser,getAllHairDressers,updateHairDresserById,deleteHairDresser}
