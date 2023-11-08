const express=require('express')
const { registerUser, loginUser, currentinfoUser } = require('../controllers/userController')
const router=express.Router()

router.post("/register",registerUser)

router.post("/login", loginUser)

router.get("/current",currentinfoUser)

module.exports=router