const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require("body-parser")
const connection = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const app = express()
app.use(cors())
PORT = process.env.PORT || 8000

// Middlewares
app.use(bodyParser.json()) 


// Get Request 
app.get("/", async(req,res)=>{
    res.send("Welcome")
})

// Routes
 app.use("/", userRoutes)
//app.use("/",postRoutes)


// Listening
app.listen(PORT, async()=>{
    try{
        await connection
        console.log("MongoDB Connected Successfully")
    }
    catch(err){
        console.log(err)
    }
    console.log(`Listening on PORT ${PORT}`)
})