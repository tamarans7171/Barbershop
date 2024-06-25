const router=require('express').Router()
const appointmentController=require('../CONTROLLERS/appointmentController')


router.get('/getAppointmentByDate/:date/:id',appointmentController.getAppointmentByDate),
router.get('/getAppointmentById/:id',appointmentController.getAppointmentById),//V
router.get('/getAppointmentByUserId/:id',appointmentController.getAppointmentByUserId),//V
router.get('/getTimesByIdOfHairDresserAndOption/:id/:option',appointmentController.getTimesByIdOfHairDresserAndOption),
router.get('/getTimesByIdOfHairDresser/:id',appointmentController.getTimesByIdOfHairDresser),
router.get('/getAppointmentsByIdOfHairDresser/:id',appointmentController.getAppointmentByHairDresserId),
router.get('/getAllAppointments',appointmentController.getAllAppointments),//V
router.put('/updateAppointment/:id',appointmentController.updateAppointment),//V
 router.delete('/deleteAppointment/:id',appointmentController.deleteAppointment),//V
router.post('/addAppointment',appointmentController.addAppointment),//V

module.exports=router




