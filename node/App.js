const express= require('express')
const App= express()
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')

App.use(cors())
App.use(bodyParser.json())
App.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
       next();
     });

const userRouter=require('./ROUTE/userRoute')
App.use('/user',userRouter)

const hairRouter=require('./ROUTE/hairDresserRouter')
App.use('/hairDresser',hairRouter)

const optionRouter=require('./ROUTE/optionRoute')
App.use('/option',optionRouter)



const appointmentRouter=require('./ROUTE/appointmentRoute')
App.use('/appointment',appointmentRouter)

const productRoute=require('./ROUTE/productRoute')
App.use('/product',productRoute)

mongoose.connect(
       // "mongodb+srv://sarah2002:sarah2002@cluster0.wjunqgz.mongodb.net/test"
`mongodb+srv://tamar:325130TA@cluster0.afogddl.mongodb.net/hairdresses`

//  "mongodb+srv://sarah2002:sarah2002@cluster0.wjunqgz.mongodb.net/test"
//  "mongodb+srv://Rinat:Rinat94@mydata.hqizd.mongodb.net/test"
).then(()=>{
       console.log("connect to mongo!")
})

    
App.get('/',(req,res)=>{
       res.send('connect')
})

App.listen(3030,()=>{
       console.log ("listening on port 3030")
})

