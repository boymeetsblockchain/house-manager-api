const asyncHandler = require("express-async-handler")
const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const generateToken= require('../utils/generateToken')
  
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide valid username, email, and password");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  // Set HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: false,
    secure:true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});



const loginUser = asyncHandler(async(req,res)=>{
  const {email,password}= req.body
  if (!email || !password ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await User.findOne({ email });
  if(!user){
    res.status(404)
    throw new Error ("User not Found")
  }

  const passwordIsCorrect = await bcrypt.compare(password,user.password)

  if(!passwordIsCorrect){
    res.status(401)
    throw new Error ("User not Found")
  }
  if(user && passwordIsCorrect){
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})

    res.cookie("token", token,{
      httpOnly:false,
      secure: true,
      sameSite:"none",
      maxAge: 30 *24 *60 *60 *1000
    })
    res.json({
      _id:user._id,
      username:user.username,
      email:user.email
    })
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user= await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })



  const logoutUser = (req, res) => {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
module.exports={
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}