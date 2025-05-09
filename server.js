const express = require('express')
const app = express();
const {Connect}=require("./db")
require("dotenv").config();


const PORT=3000;
const mongoUrl=process.env.DB_URL;
Connect(mongoUrl).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("MongoDB Failed", err))

// const mongourl="mongodb+srv://User1:user1@1@cluster0.6l7px4x.mongodb.net/"

const bodyParser=require("body-parser")
app.use(bodyParser.json())



const personRoutes=require("./routes/personRoutes")
const menuRoutes=require("./routes/menuItemRoutes")
app.use("/person", personRoutes)
app.use("/menu",menuRoutes)
app.listen(process.env.PORT || 3000, ()=>{
    console.log('listening on port 3000');
})