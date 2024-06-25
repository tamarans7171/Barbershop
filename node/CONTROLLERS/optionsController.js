const optionModel=require('../MODEL/optionsModel')

//קבלת אופציה במספרה לפי קוד
const getOptionById = async (req, res) => {
    try {
        let id = req.params.id
        let option = await optionModel.findById(id)
        res.json({ "option": option })
    }
    catch (error) {
        res.send('error :' + error)
    }
}

//קבלת אופציה במספרה לפי שם
const getOptionByName =async (req,res) => {
    try {
        let name = req.params.name
        let option = await optionModel.findOne({ name: name })
        res.json({ "option": option })
    }
    catch (error){
        res.send('error:' + error)
    }
} 

//הוספת אופציה חדשה
// const NewOption = (req, res) => {
//     let option = req.body.option
//     let NewOption = new optionsModel(option)
//     NewHairStylist.save()
//     res.send("the new option added successfully!")
// }
const addOption = async(req, res) => {
    try{
        console.log("get in");
          let option = req.body
    let NewOption = new optionModel(option)
    await NewOption.save()
    res.send("the new option added successfully!")
    }
    catch (error){
        res.send('error :' +error)
    }
}

//עדכון אופציה לפי שם
const updateOptionById = (req, res) => {
    let id = req.params.id
    let newOption = req.body
    optionModel.findByIdAndUpdate(id, newOption).then((response) => {
        res.send(`hello!! ${response.name} updated successfully`)

    }).catch((error) => {
        res.send('error :' + error)
    })
}
//להוסיף
//שליפת כל האופציות
const getAllOptions = (req, res) => {
    optionModel.find().then((options)=>{
        res.send(options)
    }).catch((err)=>{ res.send('error :' + err)})
        

}

//מחיקת האופציות במספרה
const deleteOption = (req, res) => {
    optionModel.findByIdAndDelete(req.params.id).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
}

module.exports = { getOptionById, getOptionByName, addOption, updateOptionById, getAllOptions,deleteOption}