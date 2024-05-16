const express=require('express')
const { register, verifyEmail, forgotPassword, resetPassword, login, logout, resentVerification, deleteUser, getAllUser, userUpdate, getUserById, accessToken, userProfile } = require('../controller/userController')
const { userCheck, validation, userUpdateData } = require('../utils/validation')

const router=express.Router()

// register
router.post('/register',userCheck,validation, register)
// verifying user
router.get('/verifyemail/:token',verifyEmail)
//forget password
router.post('/forgetpassword',forgotPassword)
// reset password
router.post('/resetpassword/:token',resetPassword)
// resent verfication
router.post('/resentverification/:token',resentVerification)
// login
router.post('/login',login)
// logout
router.get('/logout',logout)
// get all users
router.get('/allusers',getAllUser)
// delete user'
router.delete('/deleteuser/:id',deleteUser)
// update user
router.put('/updateuser/:id',userUpdateData,validation,userUpdate)
// get user by id
router.get('/getuserbyid/:id',getUserById)
module.exports=router