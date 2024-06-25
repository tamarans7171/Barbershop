const router=require('express').Router()
const productController=require('../CONTROLLERS/productController')



router.get('/getAllProducts',productController.getAllProduct)

router.post('/addProduct',productController.NewProduct),

module.exports=router




