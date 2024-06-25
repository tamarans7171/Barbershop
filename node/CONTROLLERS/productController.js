const productModel=require('../MODEL/productsModel')

// //קבלת אופציה במספרה לפי קוד
// const getOptionById = async (req, res) => {
//     try {
//         let id = req.params.id
//         let option = await userModel.findById(id)
//         res.json({ "option": option })
//     }
//     catch (error) {
//         res.send('error :' + error)
//     }
// }

// //קבלת אופציה במספרה לפי שם
// const getOptionByName =async (req,res) => {
//     try {
//         let name = req.params.name
//         let option = await optionsModel.findOne({ name: name }).populate("")
//         res.json({ "option": option })
//     }
//     catch (error){
//         res.send('error:' + error)
//     }
// } 


const NewProduct= async(req, res) => {
    try{
        console.log("get in");
          let product = req.body
    let NewProduct = new productModel(product)
    await NewProduct.save()
    res.send("the new option added successfully!")
    }
    catch (error){
        res.send('error :' +error)
    }
}

// //עדכון אופציה לפי שם
// const UpdateOptionByName = (req, res) => {
//     let name = req.params.name
//     let newNameOption = req.body.name
//     optionsModel.findOneAndUpdate({ name: name }, { name: newNameOption }).then((response) => {
//         res.send(`hello!! ${response} updated successfully`)

//     }).catch((error) => {
//         res.send('error :' + error)
//     })
// }
// //להוסיף
// // populate('hairStylist') 
// //שליפת כל האופציות

const getAllProduct = (req, res) => {
    productModel.find().then((pro)=>{
        res.json({pro})
    }).catch((err)=>{ res.send('error :' + err)})
}

// //מחיקת האופציות במספרה
// const deleteOption = (req, res) => {
//     optionsModel.findByIdAndDelete(req.params.id).then((data) => {
//         res.send(data)
//     }).catch((error) => {
//         res.send(error)
//     })
// }

module.exports = {NewProduct,getAllProduct}