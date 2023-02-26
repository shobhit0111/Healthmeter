const express=require("express")
const{connection} = require("./configs/db")
const{userRouter}=require("./routes/User.routes")
const{foodRouter}=require("./routes/Food.routes")
const{exerciseRouter}=require("./routes/Exercise.routes")
const cors=require("cors")
const{authenticate}=require("./middlewares/Authenticate.middleware")
const{validator}=require("./middlewares/validate.middleware")
const app=express()


app.use(express.json())
app.use(cors())
app.use(validator)
app.use("/users",userRouter)
app.use(authenticate)
app.use("/foods",foodRouter)
app.use("/exercise",exerciseRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Touble Connecting")
    }
    console.log(`Server is running at port ${process.env.port}`)

})