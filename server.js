const express = require('express')
const app = express();
const {Connect}=require("./db")


const PORT=3000;
Connect("mongodb://127.0.0.1:27017/hotels").then(()=>console.log("MongoDB connected")).catch((err)=>console.log("MongoDB Failed", err))

const bodyParser=require("body-parser")
app.use(bodyParser.json())



const personRoutes=require("./routes/personRoutes")
const menuRoutes=require("./routes/menuItemRoutes")
app.use("/person", personRoutes)
app.use("/menu",menuRoutes)
app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})