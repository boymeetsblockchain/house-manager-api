const User = require ('../models/UserModel')
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async(req,res,next)=>{
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.token;
   

    if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.userId).select('-password');
          next();
        } catch (error) {
          console.error(error);
          res.status(401);
          throw new Error('Not authorized, token failed');
        }
      } else {
        res.status(401);
        throw new Error('Not authorized, no token');
      }


})




module.exports = {protect}