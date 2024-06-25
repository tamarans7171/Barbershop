const router=require('express').Router()
const hairDresserController=require('../CONTROLLERS/hairDresserController')
// const hairDresserModel = require('../MODEL/hairDresserModel')

//router.get('/login',userController.Login)
//router.get('/getUserById/:id',userController.getUserById)
// router.get('/login',hairStylistController.Login),

router.get('/getHairDresserByUserId/:id',hairDresserController.getHairDresserByUserId),//V
router.get('/getHairDresserById/:id',hairDresserController.getHairDresserById),//V
router.get('/getHairDressersByOptionName/:name',hairDresserController.getHairDressersByOptionName),
router.get('/getAllHairDressers',hairDresserController.getAllHairDressers),//V
router.put('/updateHairDresserById/:id',hairDresserController.updateHairDresserById),//V
router.put('/updateHairDresserExpertise/:id',hairDresserController.AddExpertise),//--------
router.delete('/deleteHairDresser/:id',hairDresserController.deleteHairDresser)//V
router.post('/addHairDresser',hairDresserController.addHairDresser),//V
// router.patch('/UpdateTimeHairStylistByName/:name/:lastName',hairStylistController.UpdateTimeHairStylistByName)

module.exports=router




