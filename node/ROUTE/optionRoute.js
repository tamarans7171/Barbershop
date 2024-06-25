const router=require('express').Router()
const optionController=require('../CONTROLLERS/optionsController')
// const optionModel = require('../MODEL/optionsModel')

router.get('/getAllOptions',optionController.getAllOptions),//V
router.put('/updateOptionById/:id',optionController.updateOptionById),//V
router.post('/addOption',optionController.addOption),//V
router.get('/getOptionByName/:name',optionController.getOptionByName),//V
router.get('/getOptionById/:id',optionController.getOptionById)//V
router.delete('/deleteOptionById/:id',optionController.deleteOption)//V

module.exports =router