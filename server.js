const express = require("express")
const dotenv = require("dotenv").config()
const PORT= process.env.PORT
const connect= require('./db/db')
const userRoutes = require('./routes/userRoutes')
const tenantRoutes= require('./routes/tenantRoute')
const errorHandler = require('./middlewares/errormiddleware')
const cookieParser= require("cookie-parser")
const cors = require("cors")


const app = express()

const allowedOrigins = ['http://localhost:3000', 'https://house-manager-client.vercel.app', 'https://www.profokesfunctionsenhancementventurestenants.com.ng'];

app.use(cors({ credentials: true, origin: allowedOrigins }));


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(errorHandler)
app.use(cookieParser())
// Allow requests from localhost:5000


  app.get("/", (req,res)=>{
    res.send("Home Page")
})

      
app.use('/api/users/', userRoutes)
app.use('/api/tenant', tenantRoutes)
app.listen(PORT, (req,res)=>{
    try {
         connect()
        console.log(`server ready @ PORT ${PORT}`)
    } catch (error) {
         console.log(error)
    }
}) 


