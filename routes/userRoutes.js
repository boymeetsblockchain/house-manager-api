const express = require("express")
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController")
const { protect } = require("../middlewares/authmiddleware")

const userRoute= express.Router()


userRoute.post('/register',registerUser )
userRoute.post('/login',loginUser )
userRoute.get("/profile",protect,getUserProfile)

module.exports= userRoute