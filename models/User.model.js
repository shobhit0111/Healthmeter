const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    email:String,
    weight:String,
    password:String,
    centimeter:String,
    height:String,
    sex:String,
    date:String,
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}