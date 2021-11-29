require("dotenv").config()
const express=require("express")
const app=express()
const home =require("./routes/index")
const port=process.env.port


app.use(express.json())
app.use("/",home)
app.get("/",(req,res)=>{
    res.send("server connecting")
})
app.listen(port,()=>{
    console.log(`server connecting port No ${port}`);
})

