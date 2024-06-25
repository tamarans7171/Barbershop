const router=require('express').Router()
const userController=require('../CONTROLLERS/userController')

router.get('/getAllUsers',userController.getAllUsers)//V
router.get('/isExist/:email',userController.isExist)//V
router.get('/login/:email/:password',userController.Login)//V
router.get('/loginEmployee/:email/:password',userController.LoginEmployee)//V
router.get('/getUserById/:id',userController.getUserById)//V
router.post('/NewUser',userController.addUser)//V
router.put('/updateUser/:id',userController.updateUserById)//V
router.delete('/deleteUser/:id',userController.deleteUserById)//V

module.exports=router