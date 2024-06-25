//הניתוב הוא בעצם לאן שייך ומתקשר התוכן של הפונקציות הנוכחיות
const userModel = require('../MODEL/userModel')

const Login = (req, res) => {
    console.log("_---------")
    let email = req.params.email
    let password = req.params.password
    console.log(email)
    console.log(password)
    // userModel.find({}).then((res)=>{
    //   console.log(res);  
    // })
    userModel.findOne({ email:email, password: password }).then((response) => {

        res.send(response)

    }).catch((error) => {
        res.send('error:' + error)
    })
}

const LoginEmployee = (req, res) => {
    let email = req.params.email
    let password = req.params.password

    userModel.findOne({ email:email, password: password }).then((response) => {
res.send(response)
    }).catch((error) => {
        res.send('error:' + error)
    })
}

const isExist = (req, res) => {
    let email = req.params.email

  userModel.findOne({ email:email}).then((response) => {
    console.log(response);
    if (response) {
        
        res.send(true)
    }
    else 
    res.send(false)
    }).catch((error) => {
        res.send('error:' + error)
    })
}
const getUserById = async (req, res) => {
    try {
        let id = req.params.id
        let user = await userModel.findById(id)
        res.json({ "user": user })
    }
    catch (error) {
        res.send('error :' + error)
    }
}
// Ctrl and ?

const addUser = (req, res) => {
    let user = req.body
    console.log(user);
  
    let NewUser = new userModel(user)
console.log(user);
    NewUser.save().then((response) => {
        res.send("user  added successfully" + response)
    }) 
} 

const updateUserById = (req, res) => {
    let newUser =req.body ;
    let id =req.params.id
    console.log(id);
  
    
userModel.findByIdAndUpdate(id,newUser, function(err, result){

    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
// .then((response) => {
//         res.send("user updated successfully" + response)
//     }) 
} 

const deleteUserById= (req, res) => {
let id=req.params.id
    userModel.findByIdAndDelete(id).then((data) => {
        res.send(data)
        console.log(req.params.id+"deleted!!!!!!!!!!");
    }).catch((error) => {
        res.send(error)
    })
}
const getAllUsers=(req,res)=>{
    userModel.find({}).then((data)=>{
          res.send(data)  
        })
}

module.exports = {isExist,LoginEmployee, Login, getUserById, addUser,updateUserById,deleteUserById ,getAllUsers}